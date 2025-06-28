import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  soloAdmin?: boolean;
}

const PrivateRoute = ({ children, soloAdmin = false }: PrivateRouteProps) => {
  const { usuario } = useUser();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && usuario.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
