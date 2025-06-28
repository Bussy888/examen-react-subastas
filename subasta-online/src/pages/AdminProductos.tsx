import { useState } from "react";
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
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useAuction } from "../hooks/useAuction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const AdminProductos = () => {
  const { productos, crearProducto, eliminarProducto } = useAuction();

  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [modoEditar, setModoEditar] = useState<number | null>(null);
  const [productoEdicion, setProductoEdicion] = useState<any | null>(null);

  const formik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      imagen: "",
      precioBase: 0,
      duracion: 60,
      fechaInicio: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      titulo: Yup.string().required("Título requerido"),
      imagen: Yup.string().url("URL inválida").required("Imagen requerida"),
      precioBase: Yup.number().min(1).required("Precio base requerido"),
      duracion: Yup.number().min(1).required("Duración requerida"),
      fechaInicio: Yup.string().required("Fecha de inicio requerida"),
    }),
    onSubmit: (values, { resetForm }) => {
      const finalProducto = {
        ...values,
        fechaInicio: new Date(values.fechaInicio).toISOString(),
      };

      if (modoEditar) {
        eliminarProducto(modoEditar);
      }

      crearProducto(finalProducto);
      resetForm();
      cerrarModal();
    },
  });

  const abrirModalCrear = () => {
    setModoEditar(null);
    setProductoEdicion(null);
    formik.resetForm();
    setOpenModal(true);
  };

  const abrirModalEditar = (producto: any) => {
    setModoEditar(producto.id);
    setProductoEdicion(producto);

    formik.setValues({
      titulo: producto.titulo,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      precioBase: producto.precioBase,
      duracion: producto.duracion,
      fechaInicio: new Date(producto.fechaInicio).toISOString().slice(0, 16), // Para input datetime-local
    });

    setOpenModal(true);
  };

  const cerrarModal = () => {
    setOpenModal(false);
    setModoEditar(null);
    setProductoEdicion(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {t("gestionProductos")}
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={abrirModalCrear}
        sx={{ mb: 3 }}
      >
        {t("crearProducto")}
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("imagen")}</TableCell>
              <TableCell>{t("titulo")}</TableCell>
              <TableCell>{t("precioBase")}</TableCell>
              <TableCell>{t("duracion")}</TableCell>
              <TableCell>{t("inicio")}</TableCell>
              <TableCell>{t("acciones")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <img src={p.imagen} alt={p.titulo} style={{ height: 60 }} />
                </TableCell>
                <TableCell>{p.titulo}</TableCell>
                <TableCell>${p.precioBase}</TableCell>
                <TableCell>{p.duracion}s</TableCell>
                <TableCell>
                  {new Date(p.fechaInicio).toLocaleString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => abrirModalEditar(p)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => eliminarProducto(p.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={cerrarModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {modoEditar ? "Editar Producto" : "Crear Producto"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Título"
                  name="titulo"
                  value={formik.values.titulo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                  helperText={formik.touched.titulo && formik.errors.titulo}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="URL Imagen"
                  name="imagen"
                  value={formik.values.imagen}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.imagen && Boolean(formik.errors.imagen)}
                  helperText={formik.touched.imagen && formik.errors.imagen}
                />
              </Grid>
              {formik.values.imagen && (
                <Grid size={{ xs: 12 }}>
                  <Paper elevation={1} sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="subtitle2">
                      {t("previsualizacion")}
                    </Typography>
                    <img
                      src={formik.values.imagen}
                      alt="Previsualización"
                      style={{ maxHeight: 200, marginTop: 8 }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </Paper>
                </Grid>
              )}
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Precio Base"
                  name="precioBase"
                  type="number"
                  value={formik.values.precioBase}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.precioBase &&
                    Boolean(formik.errors.precioBase)
                  }
                  helperText={
                    formik.touched.precioBase && formik.errors.precioBase
                  }
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Duración (segundos)"
                  name="duracion"
                  type="number"
                  value={formik.values.duracion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.duracion && Boolean(formik.errors.duracion)
                  }
                  helperText={formik.touched.duracion && formik.errors.duracion}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Fecha Inicio"
                  name="fechaInicio"
                  type="datetime-local"
                  value={formik.values.fechaInicio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.fechaInicio &&
                    Boolean(formik.errors.fechaInicio)
                  }
                  helperText={
                    formik.touched.fechaInicio && formik.errors.fechaInicio
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModal}>{t("cancel")}</Button>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            {modoEditar ? `${t("saveChanges")}` : `${t("crearProducto")}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminProductos;
