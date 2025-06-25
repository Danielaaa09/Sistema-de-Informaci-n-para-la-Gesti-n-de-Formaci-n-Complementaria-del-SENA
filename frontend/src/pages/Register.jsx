import React, { useState } from "react";
import { Link } from "react-router-dom";
import senaLogo from "../assets/sena-logo.png";

const Register = () => {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    correo: "",
    rol: "Coordinador" // valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('No estás autenticado.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre_completo: form.nombre,
        correo: form.correo,
        nombre_rol: form.rol
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert(`✅ Usuario registrado correctamente.\nCorreo: ${data.usuario.correo}\nRol: ${data.usuario.rol}`);
      setForm({
        id: '',
        nombre: '',
        correo: '',
        rol: 'Coordinador'
      });
    } else {
      alert(`❌ Error: ${data.message || data.error}`);
    }
  } catch (error) {
    alert('❌ Error al conectar con el servidor.');
    console.error(error);
  }
};


  return (
    <div className="min-h-screen bg-white text-sena-gris font-sans">
      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-6 flex items-center gap-4">
        <img src={senaLogo} alt="Logo SENA" className="h-12 w-auto" />
        <h1 className="text-2xl sm:text-3xl font-bold text-sena-verde">
          Registro de Coordinador e Instructor
        </h1>
      </header>

      <main className="max-w-md mx-auto px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">ID</label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sena-verde"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sena-verde"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sena-verde"
            />
          </div>

          

          <div>
            <label className="block mb-1 font-medium">Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sena-verde"
            >
              <option value="Coordinador">Coordinador</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-sena-verde text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-sena-verde hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Register;
