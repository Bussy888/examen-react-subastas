import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import AdminProductos from "./pages/AdminProductos";
import AdminUsuarios from "./pages/AdminUsuarios";
import Historial from "./pages/Historial";
import PrivateRoute from "./routes/PrivateRoute";
import { useSSE } from "./hooks/useSSE";
import DetalleProducto from "./pages/DetalleProducto";
import ErrorBoundaryWrapper from "./components/ErrorBoundaryWrapper";

const App = () => {
  useSSE();

  return (
    <BrowserRouter>
      <ErrorBoundaryWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route
            path="/historial"
            element={
              <PrivateRoute>
                <Historial />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <PrivateRoute soloAdmin>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <PrivateRoute soloAdmin>
                <AdminProductos />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <PrivateRoute soloAdmin>
                <AdminUsuarios />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </ErrorBoundaryWrapper>
    </BrowserRouter>
  );
};

export default App;
