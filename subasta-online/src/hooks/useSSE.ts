import { useEffect } from "react";
import { useAuctionStore } from "../store/useAuctionStore";
import { useChatStore } from "../store/useChatStore";

export const useSSE = () => {
  const { agregarOferta } = useAuctionStore();
  const { agregarMensaje } = useChatStore();

  useEffect(() => {
    const source = new EventSource("http://localhost:4000/stream");

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.tipo === "nueva-oferta") {
        agregarOferta(data.productoId, data.oferta);
      }

      if (data.tipo === "nuevo-mensaje") {
        agregarMensaje(data.productoId, data.mensaje);
      }
    };

    return () => source.close();
  }, [agregarOferta, agregarMensaje]);
};
