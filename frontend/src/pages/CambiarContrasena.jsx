import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import senaLogo from '../assets/sena-logo.png';

const CambiarContrasena = () => {
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMensaje('❌ No estás autenticado.');
        return;
      }

      await axios.post('http://localhost:3000/api/auth/cambiar-contrasena',
        { nuevaContrasena },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensaje('✅ Contraseña actualizada. Redirigiendo...');
      setTimeout(() => navigate('/Dashboard'), 1500);

    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al cambiar la contraseña.');
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
          <h2 className="text-xl font-semibold text-center text-green-700">Cambiar Contraseña</h2>

          <div>
            <label className="block mb-1 font-medium">Nueva Contraseña</label>
            <input
              type="password"
              placeholder="Nueva Contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Guardar nueva contraseña
          </button>

          {mensaje && (
            <p className="text-center text-sm mt-4">{mensaje}</p>
          )}
        </form>
      </main>
    </div>
  );
};

export default CambiarContrasena;
