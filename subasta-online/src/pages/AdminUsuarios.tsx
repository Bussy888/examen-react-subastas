import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AVATARES } from "../utils/avatars";
import { useTranslation } from "react-i18next";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modoEditar, setModoEditar] = useState<string | null>(null);

  const cargarUsuarios = () => {
    fetch("http://localhost:3001/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };
  const { t} = useTranslation();
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const eliminarUsuario = (id: string) => {
    fetch(`http://localhost:3001/usuarios/${id}`, { method: "DELETE" })
      .then(() => cargarUsuarios());
  };

  const crearUsuario = (usuario: any) => {
    fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...usuario, id: Date.now().toString() }),
    }).then(() => cargarUsuarios());
  };

  const actualizarUsuario = (id: string, usuario: any) => {
    fetch(`http://localhost:3001/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    }).then(() => cargarUsuarios());
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      rol: "user",
      avatar: AVATARES[0],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required("Nombre requerido"),
      rol: Yup.string().oneOf(["admin", "user"]).required("Rol requerido"),
      avatar: Yup.string().url().required("Avatar requerido"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (modoEditar) {
        actualizarUsuario(modoEditar, { ...values, id: modoEditar });
      } else {
        crearUsuario(values);
      }
      resetForm();
      cerrarModal();
    },
  });

  const abrirModalCrear = () => {
    setModoEditar(null);
    formik.resetForm();
    setOpenModal(true);
  };

  const abrirModalEditar = (usuario: any) => {
    setModoEditar(usuario.id.toString());
    formik.setValues({
      nombre: usuario.nombre,
      rol: usuario.rol,
      avatar: usuario.avatar,
    });
    setOpenModal(true);
  };

  const cerrarModal = () => {
    setOpenModal(false);
    setModoEditar(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {t("gestionUsuarios")}
      </Typography>

      <Button variant="contained" startIcon={<Add />} onClick={abrirModalCrear} sx={{ mb: 3 }}>
        {t("crearUsuario")}
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("avatar")}</TableCell>
              <TableCell>{t("nombre")}</TableCell>
              <TableCell>{t("rol")}</TableCell>
              <TableCell>{t("acciones")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <img
                    src={u.avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{u.nombre}</TableCell>
                <TableCell>{u.rol === "admin" ? "Administrador" : "Usuario"}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => abrirModalEditar(u)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => eliminarUsuario(u.id.toString())}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={cerrarModal} maxWidth="sm" fullWidth>
        <DialogTitle>{modoEditar ? "Editar Usuario" : "Crear Usuario"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Rol"
                  name="rol"
                  select
                  value={formik.values.rol}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.rol && Boolean(formik.errors.rol)}
                  helperText={formik.touched.rol && formik.errors.rol}
                >
                  <MenuItem value="user">{t("user")}</MenuItem>
                  <MenuItem value="admin">{t("admin")}</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Avatar"
                  name="avatar"
                  select
                  value={formik.values.avatar}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                  helperText={formik.touched.avatar && formik.errors.avatar}
                >
                  {AVATARES.map((url) => (
                    <MenuItem key={url} value={url}>
                      <img
                        src={url}
                        alt="avatar"
                        width={30}
                        height={30}
                        style={{ borderRadius: "50%", marginRight: 8 }}
                      />
                      {url}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {formik.values.avatar && (
                <Grid size={{ xs: 12 }}>
                  <Paper elevation={1} sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="subtitle2">{t("previsualizacion")}:</Typography>
                    <img
                      src={formik.values.avatar}
                      alt="Avatar"
                      style={{ maxHeight: 150, marginTop: 8, borderRadius: "50%" }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </Paper>
                </Grid>
              )}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModal}>{t("cancel")}</Button>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            {modoEditar ? `${t("saveChanges")}` : `${t("crearUsuario")}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsuarios;
