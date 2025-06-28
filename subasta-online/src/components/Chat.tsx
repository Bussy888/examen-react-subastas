import { useChatStore } from "../store/useChatStore";
import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  productoId: string;
}

const Chat = ({ productoId }: Props) => {
  const { mensajes, agregarMensaje, limpiarMensajes } = useChatStore();
  const { usuario } = useUser();
  const [texto, setTexto] = useState("");
  const chatEnd = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const enviar = async () => {
    if (!texto.trim() || !usuario) return;

    const nuevoMensaje = {
      usuario: usuario.nombre,
      contenido: texto.trim(),
      hora: new Date().toISOString(),
    };

    const resProd = await fetch(`http://localhost:3001/productos/${productoId}`);
    const producto = await resProd.json();
    const nuevosMensajes = [...(producto.mensajes || []), nuevoMensaje];

    await fetch(`http://localhost:3001/productos/${productoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensajes: nuevosMensajes }),
    });

    await fetch("http://localhost:4000/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "nuevo-mensaje",
        productoId,
        mensaje: nuevoMensaje,
      }),
    });

    setTexto("");
  };

  useEffect(() => {
    const cargarHistorial = async () => {
      const res = await fetch(`http://localhost:3001/productos/${productoId}`);
      const prod = await res.json();
      limpiarMensajes(productoId);

      if (prod.mensajes?.length) {
        prod.mensajes.forEach((m) => agregarMensaje(productoId, m));
      }
    };
    cargarHistorial();
  }, [productoId]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes[productoId]?.length]);

  return (
    <Box sx={{ border: "1px solid gray", p: 2, maxHeight: 300, overflowY: "auto" }}>
      <Typography variant="h6">{t("chat")}</Typography>
      <Divider sx={{ my: 1 }} />
      {mensajes[productoId]?.map((m, idx) => (
        <Typography key={idx} sx={{ fontSize: "0.9rem", mb: 0.5 }}>
          <strong>{m.usuario}:</strong> {m.contenido}{" "}
          <span style={{ color: "gray", fontSize: "0.75rem" }}>
            ({new Date(m.hora).toLocaleTimeString()})
          </span>
        </Typography>
      ))}
      <div ref={chatEnd} />

      {usuario ? (
        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder={t("writeMessage")}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <Button variant="contained" onClick={enviar}>
            {t("send")}
          </Button>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ mt: 1, color: "red" }}>
          {t("loginToChat")}
        </Typography>
      )}
    </Box>
  );
};

export default Chat;
