import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AVATARES } from "../utils/avatars";
import { Button, TextField, MenuItem, Avatar, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface FormValues {
  nombre: string;
  rol: "admin" | "user";
  avatar: string;
}

const Register = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<string>(AVATARES[0]);
  const {t} = useTranslation();
  const initialValues: FormValues = {
    nombre: "",
    rol: "user",
    avatar: selectedAvatar
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    rol: Yup.string().oneOf(["admin", "user"]).required("Rol obligatorio"),
    avatar: Yup.string().required("Avatar obligatorio")
  });

  const handleSubmit = async (values: FormValues) => {
    const usuarioNuevo = {
      ...values,
      avatar: selectedAvatar,
      id: Date.now().toString()  // ID como string
    };

    // Guardar en JSON Server
    await fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioNuevo)
    });

    login(usuarioNuevo);
    navigate("/");
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>{t("register")}</Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, touched, errors, values }) => (
          <Form>
            <Field
              as={TextField}
              name="nombre"
              label="Nombre"
              fullWidth
              margin="normal"
              error={touched.nombre && Boolean(errors.nombre)}
              helperText={<ErrorMessage name="nombre" />}
            />

            <TextField
              select
              label="Rol"
              name="rol"
              fullWidth
              margin="normal"
              value={values.rol}
              onChange={(e) => setFieldValue("rol", e.target.value)}
              error={touched.rol && Boolean(errors.rol)}
              helperText={touched.rol && errors.rol}
            >
              <MenuItem value="user">{t("user")}</MenuItem>
              <MenuItem value="admin">{t("admin")}</MenuItem>
            </TextField>

            <Typography mt={2} mb={1}>{t("chooseAnAvatar")}:</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              {AVATARES.map((url) => (
                <Avatar
                  key={url}
                  src={url}
                  sx={{
                    width: 56,
                    height: 56,
                    border: selectedAvatar === url ? "2px solid blue" : "2px solid transparent",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setSelectedAvatar(url);
                    setFieldValue("avatar", url);
                  }}
                />
              ))}
            </Box>

            {touched.avatar && errors.avatar && (
              <Typography color="error" mt={1}>{errors.avatar}</Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              {t("register")}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
