
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/"); // Redirige al home
    window.location.reload();
  };

  return <ErrorBoundary onReset={handleReset}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWrapper;
