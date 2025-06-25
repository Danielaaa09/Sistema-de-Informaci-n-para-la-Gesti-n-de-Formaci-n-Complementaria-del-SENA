import React from "react"
import { Link } from "react-router-dom"
import senaLogo from "../assets/sena-logo.png"

const fichas = [
  { programa: "Electricidad", codigo: "456789", fecha: "17 de junio de 2025", estado: "Activa" },
  { programa: "Contabilidad", codigo: "789012", fecha: "10 de junio de 2025", estado: "Cerrada" },
  { programa: "ADSO", codigo: "123456", fecha: "1 de junio de 2025", estado: "Activa" },
  { programa: "Diseño Gráfico", codigo: "112233", fecha: "5 de mayo de 2025", estado: "Cerrada" }
]

const Historial = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-6 flex items-center gap-4">
        <img src={senaLogo} alt="Logo SENA" className="h-12 w-auto" />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
          Historial de Fichas Registradas
        </h1>
      </header>

      <main className="px-6 py-8 max-w-screen-lg mx-auto">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="text-green-700 hover:text-green-900 font-semibold"
          >
            ← Volver al inicio
          </Link>
        </div>

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
              {fichas.map((ficha, idx) => (
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
      </main>
    </div>
  )
}

export default Historial
