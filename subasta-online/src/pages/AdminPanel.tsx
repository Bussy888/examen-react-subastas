import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

const AdminPanel = () => {
  const navigate = useNavigate();
  
    const { t } = useTranslation();

  return (
    <Box p={4} sx={{ maxWidth: 500, mx: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" gutterBottom>
        {t("panelAdmin")}
      </Typography>

      <Paper elevation={4} sx={{ p: 4, width: "100%", mt: 3 }}>
        <Stack spacing={2}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => navigate("/admin/productos")}
          >
            {t("gestionProductos")}
          </Button>

          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => navigate("/admin/usuarios")}
          >
            {t("gestionUsuarios")}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AdminPanel;
