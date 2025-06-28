import { create } from "zustand";
import type { Producto } from "../hooks/useProductos";

interface Oferta {
  usuario: string;
  monto: number;
  hora: string;
}

interface AuctionStore {
  productos: Producto[];
  cargarProductos: (productos: Producto[]) => void;
  agregarOferta: (productoId: number, oferta: Oferta) => void;
  fetchProductos: () => Promise<void>;
  crearProducto: (producto: Partial<Producto>) => Promise<void>;
  eliminarProducto: (productoId: number) => Promise<void>;
}

export const useAuctionStore = create<AuctionStore>((set, get) => ({
  productos: [],

  cargarProductos: (productos) => set({ productos }),

  agregarOferta: (productoId, oferta) =>
    set((state) => ({
      productos: state.productos.map((p) =>
        p.id === productoId
          ? { ...p, ofertas: [...(p.ofertas || []), oferta] }
          : p
      ),
    })),

  fetchProductos: async () => {
    const res = await fetch("http://localhost:3001/productos");
    const data = await res.json();
    set({ productos: data });
  },

  crearProducto: async (producto) => {
    await fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...producto, ofertas: [], mensajes: [] }),
    });
    await get().fetchProductos();
  },

  eliminarProducto: async (productoId) => {
    await fetch(`http://localhost:3001/productos/${productoId}`, {
      method: "DELETE",
    });
    await get().fetchProductos();
  },
}));
