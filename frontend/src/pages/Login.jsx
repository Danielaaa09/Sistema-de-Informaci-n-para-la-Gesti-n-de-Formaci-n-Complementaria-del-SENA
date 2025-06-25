import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        correo,
        password
      });
      localStorage.setItem('token', res.data.token);
      setMensaje('✅ Redirigiendo...');
      setTimeout(() => navigate('/Dashboard'), 1000); 
    } catch (error) {
      setMensaje('❌ ' + (error.response?.data?.message || 'Error al iniciar sesión'));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Iniciar sesión</button>
      </form>
      {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}
    </div>
  );
}

export default Login;
