import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Rol = "admin" | "user" | null;

interface Usuario {
  id: number;
  nombre: string;
  avatar?: string;
  rol: Rol;
}

interface UserContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: Usuario) => {
    setUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
