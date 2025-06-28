import { useEffect } from "react";
import { useAuction } from "../hooks/useAuction";
import AuctionItem from "../components/AuctionItem";
import {
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { useAuctionStore } from "../store/useAuctionStore";
import { useChatStore } from "../store/useChatStore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HistoryIcon from "@mui/icons-material/History";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { productos, fetchProductos } = useAuction();
  const { agregarOferta } = useAuctionStore();
  const { agregarMensaje } = useChatStore();
  const ahora = new Date().getTime();
  const { t } = useTranslation();
  useEffect(() => {
    fetchProductos();

    const events = new EventSource("http://localhost:4000/stream");

    events.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.tipo === "nueva-oferta") {
        agregarOferta(payload.productoId, payload.oferta);
      }

      if (payload.tipo === "nuevo-mensaje") {
        agregarMensaje(payload.productoId, payload.mensaje);
      }
    };

    return () => events.close();
  }, []);

  const actuales = productos.filter((p) => {
    const inicio = new Date(p.fechaInicio).getTime();
    const fin = inicio + p.duracion * 1000;
    return ahora >= inicio && ahora < fin;
  });

  const proximas = productos.filter(
    (p) => new Date(p.fechaInicio).getTime() > ahora
  );

  const pasadas = productos.filter((p) => {
    const inicio = new Date(p.fechaInicio).getTime();
    const fin = inicio + p.duracion * 1000;
    return ahora >= fin;
  });

  const renderSeccion = (titulo: string, icon: JSX.Element, items: typeof productos) => (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        {icon}
        <Typography variant="h5" fontWeight={600}>
          {titulo}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {items.length > 0 ? (
        <Grid container spacing={3}>
          {items.map((p) => (
            <Grid size={{ xs: 12, md: 6 }} key={p.id}>
              <AuctionItem producto={p} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="text.secondary" sx={{ px: 1 }}>
          {t("nobidsinsection")}
        </Typography>
      )}
    </Paper>
  );

  return (
    <Box p={3}>
      {renderSeccion(`${t("subastasActuales")}`, <AccessTimeIcon />, actuales)}
      {renderSeccion(`${t("subastasProximas")}`, <EventAvailableIcon />, proximas)}
      {renderSeccion(`${t("subastasFinalizadas")}`, <HistoryIcon />, pasadas)}
    </Box>
  );
};

export default Home;
