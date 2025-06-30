import { useParams } from "react-router-dom";
import { useAuction } from "../hooks/useAuction";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Divider,
  Drawer,
  IconButton,
  Button,
} from "@mui/material";
import BidForm from "../components/BidForm";
import Chat from "../components/Chat";
import OfferHistory from "../components/OfferHistory";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { formatearTiempo } from "../utils/formatTime";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useAuction();
  const { usuario } = useUser();
  const {t} = useTranslation();
  const [chatAbierto, setChatAbierto] = useState(false);
  const producto = productos.find((p) => p.id === id);
  const [estado, setEstado] = useState<"proxima" | "activa" | "terminada">(
    "proxima"
  );
  const [tiempoRestante, setTiempoRestante] = useState(0);

  useEffect(() => {
    if (!producto) return;

    const interval = setInterval(() => {
      const ahora = new Date().getTime();
      const inicio = new Date(producto.fechaInicio).getTime();
      const fin = inicio + producto.duracion * 1000;

      if (ahora < inicio) {
        setEstado("proxima");
        setTiempoRestante(Math.floor((inicio - ahora) / 1000));
      } else if (ahora >= inicio && ahora < fin) {
        setEstado("activa");
        setTiempoRestante(Math.floor((fin - ahora) / 1000));
      } else {
        setEstado("terminada");
        setTiempoRestante(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [producto]);

  if (!producto) {
  throw new Error("Producto no encontrado");
};

  return (
    <Box p={4}>
      <Card elevation={4}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <CardMedia
              component="img"
              height="300"
              image={producto.imagen}
              alt={producto.titulo}
              style={{ objectFit: "contain", padding: 16 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {producto.titulo}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {producto.descripcion}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">
                {t("precioBase")}: <strong>${producto.precioBase}</strong>
              </Typography>
              <Typography variant="subtitle1">
                {t("inicio")}: {new Date(producto.fechaInicio).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1">
                {t("duracion")}: {formatearTiempo(producto.duracion)}
              </Typography>

              <Box mt={2}>
                {estado === "proxima" && (
                  <Typography color="warning.main" variant="h6">
                    {t("startsIn")}: {formatearTiempo(tiempoRestante)}
                  </Typography>
                )}
                {estado === "activa" && (
                  <>
                    <Typography color="success.main" variant="h6">
                      {t("timeRemaining")}: {formatearTiempo(tiempoRestante)}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>
                      {t("currentBid")}:{" "}
                      <strong>
                        ${producto.ofertas?.at(-1)?.monto || producto.precioBase}
                      </strong>
                    </Typography>
                  </>
                )}
                {estado === "terminada" && (
                  <>
                    <Typography color="error.main" variant="h6">
                      {t("auctionEnded")}
                    </Typography>
                    <Typography variant="subtitle1">
                      {t("winner")}:{" "}
                      <strong>
                        {producto.ofertas?.at(-1)?.usuario || "Sin ganador"}
                      </strong>
                    </Typography>
                    <Typography variant="subtitle1">
                      {t("finalPrice")}:{" "}
                      <strong>
                        ${producto.ofertas?.at(-1)?.monto || producto.precioBase}
                      </strong>
                    </Typography>
                  </>
                )}
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Box mt={4}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          {estado === "activa" ? (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                {usuario && (
                  <BidForm
                    productoId={producto.id}
                    ofertaActual={
                      producto.ofertas?.at(-1)?.monto || producto.precioBase
                    }
                  />
                )}
              </Grid>
              <Grid
                size={{ xs: 12, md: 6 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  variant="outlined"
                  startIcon={<ChatIcon />}
                  onClick={() => setChatAbierto(true)}
                  sx={{ width: {xs: "100%", md: "50%"}, height: {xs: "100%", md: "50%"} , fontSize: "1.2rem"}}
                >
                  {t("desplegarChat")}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Typography color="text.secondary" textAlign="center">
              {t("activeChat")}
            </Typography>
          )}
        </Paper>

        {estado === "activa" && (
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <OfferHistory producto={producto} />
          </Paper>
        )}

        <Drawer
          anchor="right"
          open={chatAbierto}
          onClose={() => setChatAbierto(false)}
        >
          <Box
            sx={{
              width: 350,
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{t("auctionChat")}</Typography>
              <IconButton onClick={() => setChatAbierto(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box flex={1} overflow="auto" mt={2}>
              <Chat productoId={producto.id} />
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default DetalleProducto;
