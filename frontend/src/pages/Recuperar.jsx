import { useState } from 'react';
import axios from 'axios';

function Recuperar() {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await axios.post('http://localhost:3000/api/auth/recuperar', { correo });
      setMensaje('✅ Revisa tu correo para restablecer la contraseña.');
    } catch (error) {
      setMensaje('❌ ' + (error.response?.data?.message || 'Error al procesar la solicitud.'));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-sena-verde">Recuperar Contraseña</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Correo electrónico</label>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sena-verde"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sena-verde text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Recuperar contraseña
          </button>
        </form>
        {mensaje && <p className="text-center mt-4">{mensaje}</p>}
      </div>
    </div>
  );
}

export default Recuperar;
