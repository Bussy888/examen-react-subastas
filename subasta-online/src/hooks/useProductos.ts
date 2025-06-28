import { useEffect, useState } from "react";

export interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  precioBase: number;
  duracion: number;
  fechaInicio: string;
  ofertas?: Oferta[];
}

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  return { productos };
};
