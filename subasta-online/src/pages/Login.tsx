import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Typography, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Usuario {
  id: number;
  nombre: string;
  avatar?: string;
  rol: "admin" | "user";
}

const Login = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { login } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error cargando usuarios:", err));
  }, []);

  const handleLogin = (user: Usuario) => {
    login(user);
    navigate("/");
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>{t("iniciarSesion")}:</Typography>

      {usuarios.length === 0 ? (
        <Typography>{t("noUsers")}</Typography>
      ) : (
        <Grid container spacing={2}>
          {usuarios.map((user) => (
            <Grid size={{ xs: 12, md: 6 }} key={user.id}>
              <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                <Avatar src={user.avatar} sx={{ width: 64, height: 64, mx: "auto", mb: 1 }} />
                <Typography variant="h6">{user.nombre}</Typography>
                <Typography variant="body2" color="textSecondary">{t("rol")}: {user.rol}</Typography>
                <Button variant="contained" sx={{ mt: 1 }} onClick={() => handleLogin(user)}>
                  {t("enter")}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Login;
