import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import senaLogo from "../assets/sena-logo.png";

const NuevaFicha = () => {
  const [codigo, setCodigo] = useState("");
  const [programa, setPrograma] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [duracion, setDuracion] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [fecha, setFecha] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estado, setEstado] = useState("Activa");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría el fetch al backend
    const datosFicha = {
      codigo,
      programa,
      modalidad,
      duracion,
      empresa,
      fecha,
      fechaFin,
      estado,
    };

    console.log("Datos enviados:", datosFicha);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-6 flex items-center gap-4">
        <img src={senaLogo} alt="Logo SENA" className="h-12 w-auto" />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
          Registrar nuevas Fichas
        </h1>
      </header>

      <main className="max-w-xl mx-auto py-10 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md border space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Código de ficha</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-green-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Programa</label>
            <input
              type="text"
              value={programa}
              onChange={(e) => setPrograma(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-green-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Modalidad</label>
            <select
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-green-600"
            >
              <option value="">Selecciona</option>
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
              <option value="Mixta">Mixta</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Duración (horas)</label>
            <input
              type="number"
              min={1}
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-green-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Empresa / Centro</label>
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-green-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Fecha de inicio</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-green-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Fecha de finalización</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-green-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full px-4 py-2 border rounded outline-green-600"
            >
              <option value="Activa">Activa</option>
              <option value="Cerrada">Cerrada</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Registrar ficha
          </button>
        </form>
      </main>
    </div>
  );
};

export default NuevaFicha;
