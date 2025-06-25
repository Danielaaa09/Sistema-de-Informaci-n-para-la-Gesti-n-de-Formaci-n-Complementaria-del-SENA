import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import senaLogo from '../assets/sena-logo.png'

const Login = () => {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        correo,
        password
      })
      localStorage.setItem('token', res.data.token)
      setMensaje('✅ Redirigiendo...')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (error) {
      setMensaje('❌ ' + (error.response?.data?.message || 'Error al iniciar sesión'))
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center mb-6">
          <img src={senaLogo} alt="Logo SENA" className="h-12 w-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Iniciar sesión
          </button>

          {mensaje && (
            <p
              className={`text-center mt-2 text-sm font-medium ${
                mensaje.startsWith('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
