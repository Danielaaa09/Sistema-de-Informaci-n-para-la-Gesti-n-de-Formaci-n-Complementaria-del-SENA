import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register'; // ✅ correcto
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NuevaFicha from "./pages/NuevaFicha";
import Historial from './pages/Historial'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/registro" replace />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>Ruta no encontrada</h1>} />
        <Route path="/nueva-ficha" element={<NuevaFicha />} />
            <Route path="/historial" element={<Historial />} />
      </Routes>
    </Router>
  );
}

export default App;
