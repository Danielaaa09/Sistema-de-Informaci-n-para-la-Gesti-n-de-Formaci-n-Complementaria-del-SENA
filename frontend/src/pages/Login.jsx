import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import senaLogo from '../assets/sena-logo.png';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { correo, password });

      // Guardar token
      localStorage.setItem('token', res.data.token);

      // Verificar si debe cambiar contraseña
      if (res.data.cambiarContrasena) {
        setMensaje('🔒 Debes cambiar tu contraseña.');
        setTimeout(() => navigate('/cambiar-contrasena'), 1000); // Redirige al formulario de cambio
      } else {
        setMensaje('✅ Redirigiendo al Dashboard...');
        setTimeout(() => navigate('/Dashboard'), 1000);
      }

    } catch (error) {
      setMensaje('❌ ' + (error.response?.data?.message || 'Error al iniciar sesión'));
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-6 flex items-center gap-4">
        <img src={senaLogo} alt="Logo SENA" className="h-12 w-auto" />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
          Sistema de Gestión de Formación SENA
        </h1>
      </header>

      <main className="flex justify-center items-center min-h-[80vh] px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl shadow p-8 space-y-6 w-full max-w-md"
        >
          <h2 className="text-xl font-semibold text-center text-green-700">Iniciar Sesión</h2>

          <div>
            <label className="block mb-1 font-medium">Correo electrónico</label>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Iniciar sesión
          </button>

          {mensaje && (
            <p className="text-center text-sm mt-4">{mensaje}</p>
          )}
        </form>
      </main>
    </div>
  );
}

export default Login;
