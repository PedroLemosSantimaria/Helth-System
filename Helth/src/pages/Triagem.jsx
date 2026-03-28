import { useState } from "react";
import api from "../api/client";

export default function Triagem() {
  const [form, setForm] = useState({
    atendimentoId: "",
    sintomas: "",
    pressaoArterial: "",
    peso: "",
    altura: "",
    especialidadeId: "",
  });

  const submit = async () => {
    if (!form.atendimentoId) return alert("Atendimento obrigatório");
    if (!form.sintomas) return alert("Sintomas obrigatórios");

    await api.post("/Triagem", {
      atendimentoId: Number(form.atendimentoId),
      sintomas: form.sintomas,
      pressaoArterial: form.pressaoArterial,
      peso: Number(form.peso),
      altura: Number(form.altura),
      especialidadeId: Number(form.especialidadeId),
    });

    alert("Triagem realizada");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Triagem</h2>

      <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="border p-2"
          />
        ))}

        <button onClick={submit} className="bg-blue-600 text-white py-2 rounded">
          Enviar
        </button>
      </div>
    </div>
  );
}