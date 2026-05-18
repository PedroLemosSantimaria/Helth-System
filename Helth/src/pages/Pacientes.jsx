import { useEffect, useState } from "react";
import api from "../api/client";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    sexo: "",
    email: "",
  });

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

  const validarEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const load = async () => {
    try {
      setErro("");
      const res = await api.get("/Paciente");
      setPacientes(res.data);
    } catch {
      setErro("Nao foi possivel carregar os pacientes.");
    } finally {
      setLoading(false);
    }
  };

  const create = async () => {
    if (!form.nome) return alert("Nome obrigatorio");

    if (!form.telefone || form.telefone.replace(/\D/g, "").length < 10) {
      return alert("Telefone invalido");
    }

    if (!validarEmail(form.email)) return alert("Email invalido");

    if (!form.sexo) return alert("Sexo obrigatorio");

    try {
      setSalvando(true);
      setErro("");
      await api.post("/Paciente", form);

      setForm({
        nome: "",
        telefone: "",
        sexo: "",
        email: "",
      });

      load();
    } catch {
      setErro("Nao foi possivel cadastrar o paciente.");
    } finally {
      setSalvando(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Cadastro</p>
        <h2 className="text-3xl font-bold text-slate-900">Pacientes</h2>
        <p className="mt-2 text-slate-600">
          Registre os dados basicos do paciente e acompanhe a lista cadastrada.
        </p>
      </div>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Novo paciente</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Nome completo
            <input
              placeholder="Ex: Ana Souza"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Telefone
            <input
              placeholder="(11) 99999-9999"
              value={form.telefone}
              onChange={(e) =>
                setForm({
                  ...form,
                  telefone: formatTelefone(e.target.value),
                })
              }
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Email
            <input
              placeholder="paciente@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Sexo
            <select
              value={form.sexo}
              onChange={(e) => setForm({ ...form, sexo: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Selecione o sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </label>

          <button
            onClick={create}
            disabled={salvando}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 md:col-span-2"
          >
            {salvando ? "Cadastrando..." : "Cadastrar paciente"}
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Pacientes cadastrados</h3>
        </div>

        {loading ? (
          <p className="p-5 text-sm text-slate-500">Carregando pacientes...</p>
        ) : pacientes.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">Nenhum paciente cadastrado.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {pacientes.map((p) => (
              <div key={p.id} className="grid gap-2 px-5 py-4 md:grid-cols-4 md:items-center">
                <div>
                  <p className="font-semibold text-slate-900">{p.nome}</p>
                  <p className="text-xs text-slate-500">ID {p.id}</p>
                </div>
                <p className="text-sm text-slate-600">{p.telefone}</p>
                <p className="text-sm text-slate-600">{p.email}</p>
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {p.sexo}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
