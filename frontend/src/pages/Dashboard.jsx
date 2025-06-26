import React from "react";
import { Link, useNavigate } from "react-router-dom";
import senaLogo from "../assets/sena-logo.png";

const fichasMock = [
  { programa: "Electricidad", codigo: "456789", fecha: "17 de junio de 2025", estado: "Activa" },
  { programa: "Contabilidad", codigo: "789012", fecha: "10 de junio de 2025", estado: "Cerrada" },
  { programa: "ADSO", codigo: "123456", fecha: "1 de junio de 2025", estado: "Activa" }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // 🔐 Eliminar token al cerrar sesión
    navigate('/'); // Redirigir al login
  };

  const totalFichas = fichasMock.length;
  const programas = [...new Set(fichasMock.map(f => f.programa))];
  const ultimasFichas = [...fichasMock].slice(-3).reverse();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={senaLogo} alt="Logo SENA" className="h-12 w-auto" />
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
            Sistema de Gestión de Formación SENA
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="px-6 py-8 max-w-screen-lg mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h2 className="text-sm font-semibold">Total de fichas</h2>
            <p className="text-4xl font-bold text-green-700 mt-1">{totalFichas}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h2 className="text-sm font-semibold">Programas activos</h2>
            <p className="text-4xl font-bold text-green-700 mt-1">{programas.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h2 className="text-sm font-semibold">Última ficha</h2>
            <p className="text-lg mt-1">
              {ultimasFichas[0]?.programa} ({ultimasFichas[0]?.codigo})
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Últimas fichas registradas</h2>
          <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="p-3">Programa</th>
                  <th className="p-3">Código</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {ultimasFichas.map((ficha, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="p-3">{ficha.programa}</td>
                    <td className="p-3">{ficha.codigo}</td>
                    <td className="p-3">{ficha.fecha}</td>
                    <td className="p-3">{ficha.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-wrap gap-4">
          <Link
            to="/nueva-ficha"
            className="bg-sena-verde text-white px-4 py-2 rounded shadow hover:bg-green-800 transition"
          >
            + Nueva ficha
          </Link>
          <Link
            to="/historial"
            className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
          >
            Ver historial
          </Link>
          <Link
            to="/Register"
            className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
          >
            Registrar usuario
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
