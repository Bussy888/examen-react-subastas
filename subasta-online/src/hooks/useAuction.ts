import { useAuctionStore } from "../store/useAuctionStore";
import { useUser } from "../context/UserContext";

export const useAuction = () => {
  const { productos, agregarOferta, fetchProductos, crearProducto, eliminarProducto } = useAuctionStore();
  const { usuario } = useUser();

  const ofertar = async (productoId: number, monto: number) => {
    if (!usuario) return { ok: false, msg: "Debes iniciar sesión." };

    const nuevaOferta = {
      usuario: usuario.nombre,
      monto,
      hora: new Date().toISOString(),
    };

    const resProd = await fetch(`http://localhost:3001/productos/${productoId}`);
    const producto = await resProd.json();

    const nuevasOfertas = [...(producto.ofertas || []), nuevaOferta];

    await fetch(`http://localhost:3001/productos/${productoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ofertas: nuevasOfertas }),
    });

    await fetch("http://localhost:4000/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "nueva-oferta",
        productoId,
        oferta: nuevaOferta,
      }),
    });

    return { ok: true };
  };

  return { productos, ofertar, fetchProductos, crearProducto, eliminarProducto };
};
