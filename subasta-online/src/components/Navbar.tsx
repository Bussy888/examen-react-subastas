import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import {
  HomeRounded,
  HistoryRounded,
  AdminPanelSettingsRounded,
  LoginRounded,
  PersonAddRounded,
  LogoutRounded,
  ArrowDropDown,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { usuario, logout } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const salir = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        
        {/* Logo y navegación */}
        <Box display="flex" alignItems="center" gap={3}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            SubastasApp
          </Typography>

          {usuario && (
            <>
              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={{ textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
              >
                <HomeRounded fontSize="small" /> {t("home")}
              </Button>
              <Button
                component={Link}
                to="/historial"
                color="inherit"
                sx={{ textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
              >
                <HistoryRounded fontSize="small" /> {t("history")}
              </Button>
              {usuario.rol === "admin" && (
                <Button
                  component={Link}
                  to="/admin"
                  color="inherit"
                  sx={{ textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
                >
                  <AdminPanelSettingsRounded fontSize="small" /> {t("adminPanel")}
                </Button>
              )}
            </>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          {usuario ? (
            <>
              <Avatar src={usuario.avatar} sx={{ width: 32, height: 32 }} />
              <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
                {usuario.nombre}
              </Typography>
              <IconButton onClick={handleMenuOpen} sx={{ color: "white" }} size="small">
                <ArrowDropDown />
              </IconButton>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={salir}>
                  <ListItemIcon>
                    <LogoutRounded fontSize="small" />
                  </ListItemIcon>
                  {t("logout")}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
              >
                <LoginRounded fontSize="small" /> {t("login")}
              </Button>
              <Button
                component={Link}
                to="/registro"
                color="inherit"
                sx={{ textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
              >
                <PersonAddRounded fontSize="small" /> {t("register")}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
