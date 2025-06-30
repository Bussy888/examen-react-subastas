import { useEffect, useRef } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import type { Producto } from "../hooks/useProductos";
import { useTranslation } from "react-i18next";

interface Props {
  producto: Producto;
}

const OfferHistory = ({ producto }: Props) => {
  const listaRef = useRef<HTMLUListElement>(null);
  
  const { t } = useTranslation();
  useEffect(() => {
    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight;
    }
  }, [producto.ofertas]); 

  return (
    <Box sx={{ maxHeight: 200, overflowY: "auto", border: "1px solid #ddd", mt: 2, p: 1 }}>
      <Typography variant="subtitle1" gutterBottom>
        {t("offerHistory")}
      </Typography>

      <List ref={listaRef} dense>
        {producto.ofertas?.map((oferta, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText
              primary={`${oferta.usuario} ${t("bidFor")} $${oferta.monto}`}
              secondary={new Date(oferta.hora).toLocaleTimeString()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OfferHistory;
