import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CambiarContrasena() {
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const validarContrasena = (password) => {
    const regex = /^(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    if (!validarContrasena(nuevaContrasena)) {
      setMensaje('❌ La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 2 números y 1 carácter especial.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('❌ No estás autenticado.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/api/auth/cambiar-contrasena',
        { nuevaContrasena },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensaje('✅ Contraseña actualizada correctamente.');
      setTimeout(() => navigate('/Dashboard'), 1500);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al cambiar la contraseña.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Cambiar Contraseña</h2>

        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
        >
          Cambiar Contraseña
        </button>

        {mensaje && <p className="text-center mt-4 text-red-600">{mensaje}</p>}
      </form>
    </div>
  );
}

export default CambiarContrasena;
