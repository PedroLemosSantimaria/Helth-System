import { useEffect, useState } from "react";
import api from "../api/client";

export default function Atendimento() {
  const [fila, setFila] = useState([]);
  const [pacienteId, setPacienteId] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [acao, setAcao] = useState(false);

  const load = async () => {
    try {
      setErro("");
      const res = await api.get("/Atendimento/fila");
      setFila(res.data);
    } catch {
      setErro("Nao foi possivel carregar a fila.");
    } finally {
      setLoading(false);
    }
  };

  const criar = async () => {
    if (!pacienteId) return alert("Informe o ID do paciente");

    try {
      setAcao(true);
      setErro("");
      await api.post("/Atendimento", { pacienteId: Number(pacienteId) });
      setPacienteId("");
      load();
    } catch {
      setErro("Nao foi possivel adicionar o paciente na fila.");
    } finally {
      setAcao(false);
    }
  };

  const chamar = async () => {
    try {
      setAcao(true);
      setErro("");
      await api.post("/Atendimento/chamar-proximo");
      load();
    } catch {
      setErro("Nao foi possivel chamar o proximo paciente.");
    } finally {
      setAcao(false);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Atendimento</p>
        <h2 className="text-3xl font-bold text-slate-900">Fila de atendimento</h2>
        <p className="mt-2 text-slate-600">
          Adicione pacientes na fila e chame o proximo para triagem.
        </p>
      </div>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
          <label className="text-sm font-medium text-slate-700">
            ID do paciente
            <input
              placeholder="Ex: 1"
              type="number"
              min="1"
              value={pacienteId}
              onChange={(e) => setPacienteId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <button
            onClick={criar}
            disabled={acao}
            className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            Adicionar na fila
          </button>
          <button
            onClick={chamar}
            disabled={acao || fila.length === 0}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Chamar proximo
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Pacientes aguardando</h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {fila.length} na fila
          </span>
        </div>

        {loading ? (
          <p className="p-5 text-sm text-slate-500">Carregando fila...</p>
        ) : fila.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">Nenhum paciente aguardando.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {fila.map((f) => (
              <div key={f.id} className="grid gap-3 px-5 py-4 md:grid-cols-[90px_1fr_auto] md:items-center">
                <span className="text-lg font-bold text-blue-600">#{f.numeroSequencial}</span>
                <div>
                  <p className="font-semibold text-slate-900">{f.pacienteNome}</p>
                  <p className="text-xs text-slate-500">Atendimento {f.id}</p>
                </div>
                <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
