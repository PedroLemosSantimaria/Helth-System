import { useEffect, useState } from "react";
import api from "../api/client";

export default function Triagem() {
  const [especialidades, setEspecialidades] = useState([]);
  const [triagens, setTriagens] = useState([]);
  const [loadingTriagens, setLoadingTriagens] = useState(true);
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

  const carregarEspecialidades = async () => {
    try {
      const res = await api.get("/Especialidade");
      setEspecialidades(res.data);
    } catch {
      setErro("Nao foi possivel carregar as especialidades.");
    }
  };

  const carregarTriagens = async () => {
    try {
      setLoadingTriagens(true);
      const res = await api.get("/Triagem");
      setTriagens(res.data);
    } catch {
      setErro("Nao foi possivel carregar as triagens salvas.");
    } finally {
      setLoadingTriagens(false);
    }
  };

  useEffect(() => {
    carregarEspecialidades();
    carregarTriagens();
  }, []);

  const submit = async () => {
    if (!form.atendimentoId) return alert("Atendimento obrigatorio");
    if (!form.sintomas) return alert("Sintomas obrigatorios");
    if (!form.especialidadeId) return alert("Especialidade obrigatoria");

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
      carregarTriagens();
    } catch (error) {
      const mensagemApi = error.response?.data?.message;
      setErro(mensagemApi || "Nao foi possivel salvar a triagem.");
    } finally {
      setSalvando(false);
    }
  };

  const formatarData = (data) => {
    if (!data) return "Data nao informada";
    return new Date(data).toLocaleString("pt-BR");
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
            Especialidade
            <select
              value={form.especialidadeId}
              onChange={(e) => setForm({ ...form, especialidadeId: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Selecione a especialidade</option>
              {especialidades.map((especialidade) => (
                <option key={especialidade.id} value={especialidade.id}>
                  {especialidade.nome}
                </option>
              ))}
            </select>
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

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Triagens salvas</h3>
          <p className="mt-1 text-sm text-slate-500">
            Acompanhe as triagens ja registradas no sistema.
          </p>
        </div>

        {loadingTriagens ? (
          <p className="p-5 text-sm text-slate-500">Carregando triagens...</p>
        ) : triagens.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">Nenhuma triagem registrada.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {triagens.map((triagem) => (
              <div key={triagem.id} className="grid gap-3 px-5 py-4 lg:grid-cols-[1.2fr_1.6fr_1fr]">
                <div>
                  <p className="font-semibold text-slate-900">
                    {triagem.pacienteNome || "Paciente nao informado"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Atendimento {triagem.atendimentoId} - {formatarData(triagem.dataHoraChegada)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-700">{triagem.sintomas}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Pressao: {triagem.pressaoArterial || "-"} - Peso: {triagem.peso ?? "-"} kg - Altura:{" "}
                    {triagem.altura ?? "-"} m
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {triagem.especialidadeNome || "Especialidade nao informada"}
                  </span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    {triagem.status || "Status nao informado"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
