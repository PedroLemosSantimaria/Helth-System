import { useEffect, useState } from "react";
import api from "../api/client";

export default function Atendimento() {
  const [fila, setFila] = useState([]);
  const [pacienteId, setPacienteId] = useState("");

  const load = async () => {
    const res = await api.get("/Atendimento/fila");
    setFila(res.data);
  };

  const criar = async () => {
    await api.post("/Atendimento", { pacienteId: Number(pacienteId) });
    load();
  };

  const chamar = async () => {
    await api.post("/Atendimento/chamar-proximo");
    load();
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Fila</h2>

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Paciente ID"
          value={pacienteId}
          onChange={(e) => setPacienteId(e.target.value)}
          className="border p-2"
        />
        <button onClick={criar} className="bg-green-600 text-white px-4 rounded">
          Adicionar
        </button>
        <button onClick={chamar} className="bg-red-600 text-white px-4 rounded">
          Chamar
        </button>
      </div>

      {fila.map((f) => (
        <div key={f.id} className="bg-white p-3 mb-2 rounded-xl shadow">
          #{f.numeroSequencial} - Paciente {f.pacienteNome} - {f.status}
        </div>
      ))}
    </div>
  );
}