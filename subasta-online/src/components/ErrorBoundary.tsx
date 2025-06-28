import { Component, ReactNode } from "react";
import { Button, Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          textAlign="center"
          px={2}
        >
          <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom color="error">
            ¡Algo salió mal!
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={400} mb={3}>
            Se produjo un error inesperado mientras cargábamos la aplicación. Puedes volver al inicio.
          </Typography>
          <Button variant="contained" color="error" onClick={this.props.onReset}>
            Ir al inicio
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
