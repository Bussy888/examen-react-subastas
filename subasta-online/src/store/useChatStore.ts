import { create } from "zustand";

interface Mensaje {
  usuario: string;
  contenido: string;
  hora: string;
}

interface ChatStore {
  mensajes: Record<string, Mensaje[]>; 
  agregarMensaje: (productoId: string, msg: Mensaje) => void;
  limpiarMensajes: (productoId: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  mensajes: {},

  agregarMensaje: (productoId, msg) =>
    set((state) => ({
      mensajes: {
        ...state.mensajes,
        [productoId]: [...(state.mensajes[productoId] || []), msg],
      },
    })),

  limpiarMensajes: (productoId) =>
    set((state) => {
      const copia = { ...state.mensajes };
      delete copia[productoId];
      return { mensajes: copia };
    }),
}));
