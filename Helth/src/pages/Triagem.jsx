import { useState } from "react";
import api from "../api/client";

export default function Triagem() {
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [form, setForm] = useState({
    atendimentoId: "",
    sintomas: "",
    pressaoArterial: "",
    peso: "",
    altura: "",
    especialidadeId: "",
  });

  const submit = async () => {
    if (!form.atendimentoId) return alert("Atendimento obrigatorio");
    if (!form.sintomas) return alert("Sintomas obrigatorios");

    try {
      setSalvando(true);
      setErro("");
      setSucesso("");

      await api.post("/Triagem", {
        atendimentoId: Number(form.atendimentoId),
        sintomas: form.sintomas,
        pressaoArterial: form.pressaoArterial,
        peso: Number(form.peso),
        altura: Number(form.altura),
        especialidadeId: Number(form.especialidadeId),
      });

      setSucesso("Triagem realizada com sucesso.");
      setForm({
        atendimentoId: "",
        sintomas: "",
        pressaoArterial: "",
        peso: "",
        altura: "",
        especialidadeId: "",
      });
    } catch {
      setErro("Nao foi possivel salvar a triagem.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Avaliacao inicial</p>
        <h2 className="text-3xl font-bold text-slate-900">Triagem</h2>
        <p className="mt-2 text-slate-600">
          Preencha os dados clinicos iniciais do atendimento chamado.
        </p>
      </div>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      {sucesso && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {sucesso}
        </div>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            ID do atendimento
            <input
              type="number"
              min="1"
              placeholder="Ex: 12"
              value={form.atendimentoId}
              onChange={(e) => setForm({ ...form, atendimentoId: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Especialidade ID
            <input
              type="number"
              min="1"
              placeholder="Ex: 1"
              value={form.especialidadeId}
              onChange={(e) => setForm({ ...form, especialidadeId: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Sintomas relatados
            <textarea
              rows="4"
              placeholder="Descreva os sintomas principais"
              value={form.sintomas}
              onChange={(e) => setForm({ ...form, sintomas: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Pressao arterial
            <input
              placeholder="Ex: 120/80"
              value={form.pressaoArterial}
              onChange={(e) => setForm({ ...form, pressaoArterial: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Peso
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Kg"
                value={form.peso}
                onChange={(e) => setForm({ ...form, peso: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Altura
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Metros"
                value={form.altura}
                onChange={(e) => setForm({ ...form, altura: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>
        </div>

        <button
          onClick={submit}
          disabled={salvando}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {salvando ? "Salvando..." : "Salvar triagem"}
        </button>
      </section>
    </div>
  );
}
