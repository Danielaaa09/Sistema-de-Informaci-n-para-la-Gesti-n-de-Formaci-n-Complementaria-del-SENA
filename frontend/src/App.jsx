import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import CambiarContrasena from './pages/CambiarContrasena';
import Recuperar from './pages/Recuperar';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
        <Route path="/recuperar" element={<Recuperar />} />

      </Routes>
    </Router>
  );
}

export default App;
