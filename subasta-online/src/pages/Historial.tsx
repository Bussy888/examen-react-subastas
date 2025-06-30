import { useAuction } from "../hooks/useAuction";
import { useUser } from "../context/UserContext";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const Historial = () => {
  const { productos } = useAuction();
  const { usuario: user } = useUser();
  const ahora = new Date().getTime();
  const {t} = useTranslation();

  const finalizadas = productos.filter((p) => {
    const inicio = new Date(p.fechaInicio).getTime();
    const fin = inicio + p.duracion * 1000;
    return ahora >= fin;
  });

  const ganadasPorUsuario = finalizadas.filter((p) => {
    const ultimaOferta = p.ofertas?.at(-1);
    return ultimaOferta?.usuario === user?.nombre;
  });

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {t("history")}
      </Typography>

      {ganadasPorUsuario.length === 0 ? (
        <Typography>{t("noBids")}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("imagen")}</TableCell>
                <TableCell>{t("producto")}</TableCell>
                <TableCell>{t("finalPrice")}</TableCell>
                <TableCell>{t("winner")}</TableCell>
                <TableCell>{t("finalizo")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ganadasPorUsuario.map((p) => {
                const ultimaOferta = p.ofertas?.at(-1);

                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <img src={p.imagen} alt={p.titulo} width={60} height={60} style={{ objectFit: "cover", borderRadius: 8 }} />
                    </TableCell>
                    <TableCell>{p.titulo}</TableCell>
                    <TableCell>${ultimaOferta?.monto ?? p.precioBase}</TableCell>
                    <TableCell>{ultimaOferta?.usuario}</TableCell>
                    <TableCell>{new Date(p.fechaInicio).toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Historial;
