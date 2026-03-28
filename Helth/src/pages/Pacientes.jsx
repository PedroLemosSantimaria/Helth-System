import { useEffect, useState } from "react";
import api from "../api/client";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    sexo: "",
    email: "",
  });

  // 🔹 Máscara telefone BR
  const formatTelefone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (m, a, b, c) =>
        c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`
      );
    }

    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (m, a, b, c) =>
      c ? `(${a}) ${b}-${c}` : `(${a}) ${b}`
    );
  };

  // 🔹 Validação email
  const validarEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const load = async () => {
    const res = await api.get("/Paciente");
    setPacientes(res.data);
  };

  const create = async () => {
    if (!form.nome) return alert("Nome obrigatório");

    if (!form.telefone || form.telefone.replace(/\D/g, "").length < 10)
      return alert("Telefone inválido");

    if (!validarEmail(form.email))
      return alert("Email inválido");

    if (!form.sexo)
      return alert("Sexo obrigatório");

    await api.post("/Paciente", form);

    setForm({
      nome: "",
      telefone: "",
      sexo: "",
      email: "",
    });

    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pacientes</h2>

      <div className="bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-2 gap-2">
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Telefone"
          value={form.telefone}
          onChange={(e) =>
            setForm({
              ...form,
              telefone: formatTelefone(e.target.value),
            })
          }
          className="border p-2"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
        />

        <select
          value={form.sexo}
          onChange={(e) => setForm({ ...form, sexo: e.target.value })}
          className="border p-2"
        >
          <option value="">Selecione o sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>

        <button
          onClick={create}
          className="col-span-2 bg-blue-600 text-white py-2 rounded"
        >
          Cadastrar Paciente
        </button>
      </div>

      {pacientes.map((p) => (
        <div key={p.id} className="bg-white p-3 mb-2 rounded-xl shadow">
          <strong>{p.nome}</strong> - {p.telefone}
        </div>
      ))}
    </div>
  );
}