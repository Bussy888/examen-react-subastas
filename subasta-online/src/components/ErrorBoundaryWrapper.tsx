
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/"); 
    window.location.reload();
  };

  return <ErrorBoundary onReset={handleReset}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWrapper;
