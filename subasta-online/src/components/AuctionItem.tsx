import { useEffect, useState } from "react";
import type { Producto } from "../hooks/useProductos";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { formatearTiempo } from "../utils/formatTime";
import { useTranslation } from "react-i18next";

interface Props {
  producto: Producto;
}

const AuctionItem = ({ producto }: Props) => {
  const navigate = useNavigate();
  const { usuario } = useUser();
  const { t } = useTranslation();

  const [tiempoRestante, setTiempoRestante] = useState<number>(0);
  const [estado, setEstado] = useState<"proxima" | "activa" | "terminada">("proxima");

  useEffect(() => {
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

  const ultimaOferta = producto.ofertas?.at(-1)?.monto || producto.precioBase;
  const ganador = producto.ofertas?.at(-1)?.usuario || t("noWinner");

  const verDetalle = () => {
    navigate(`/producto/${producto.id}`);
  };

  return (
    <Card sx={{ maxWidth: 400, m: "auto", cursor: "pointer" }} onClick={verDetalle}>
      <CardMedia
        component="img"
        height="140"
        image={producto.imagen}
        alt={producto.titulo}
      />
      <CardContent>
        <Typography variant="h6">{producto.titulo}</Typography>
        <Typography>{producto.descripcion}</Typography>
        <Typography>{t("basePrice")}: ${producto.precioBase}</Typography>

        {estado === "activa" && (
          <Typography color="success.main">
            {t("timeRemaining")}: {formatearTiempo(tiempoRestante)}
          </Typography>
        )}

        {estado === "proxima" && (
          <Typography color="warning.main">
            {t("startsIn")}: {formatearTiempo(tiempoRestante)}
          </Typography>
        )}

        {estado === "terminada" && (
          <>
            <Typography color="error.main">{t("finished")}</Typography>
            <Typography>{t("winner")}: {ganador}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AuctionItem;
