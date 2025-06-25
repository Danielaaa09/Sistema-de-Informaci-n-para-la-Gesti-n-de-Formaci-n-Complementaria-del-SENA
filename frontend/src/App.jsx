import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NuevaFicha from "./pages/NuevaFicha";
import Historial from './pages/Historial';
import Register from './pages/Register';
import { Navigate, Route, Routes } from "react-router-dom";
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registro" replace />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/nueva-ficha" element={<NuevaFicha />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="*" element={<h1>Ruta no encontrada</h1>} />
    </Routes>
  );
}

export default App;
