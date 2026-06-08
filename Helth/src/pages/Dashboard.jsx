import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const cards = [
  {
    title: "Pacientes",
    description: "Cadastre e consulte os pacientes do sistema.",
    link: "/pacientes",
    linkText: "Abrir pacientes",
    color: "border-blue-200 bg-blue-50 text-blue-700",
  },
  {
    title: "Atendimentos",
    description: "Acompanhe a fila e chame o proximo paciente.",
    link: "/atendimento",
    linkText: "Ver fila",
    color: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    title: "Triagens",
    description: "Registre sintomas, medidas e especialidade.",
    link: "/triagem",
    linkText: "Fazer triagem",
    color: "border-amber-200 bg-amber-50 text-amber-700",
  },
];

export default function Dashboard() {
  const [resumo, setResumo] = useState({
    pacientes: 0,
    atendimentos: 0,
  });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const loadResumo = async () => {
      try {
        setErro("");
        const [pacientesRes, filaRes] = await Promise.all([
          api.get("/Paciente"),
          api.get("/Atendimento/fila"),
        ]);

        setResumo({
          pacientes: pacientesRes.data.length,
          atendimentos: filaRes.data.length,
        });
      } catch {
        setErro("Nao foi possivel carregar o resumo agora.");
      } finally {
        setLoading(false);
      }
    };

    loadResumo();
  }, []);

  const valores = [resumo.pacientes, resumo.atendimentos, "Novo"];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Visao geral</p>
        <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
        <p className="mt-2 text-slate-600">
          Resumo simples do fluxo hospitalar para acompanhar a apresentacao do projeto.
        </p>
      </div>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card, index) => (
          <div key={card.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`mb-4 inline-flex rounded-lg border px-3 py-1 text-sm font-semibold ${card.color}`}>
              {loading ? "..." : valores[index]}
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 min-h-12 text-sm text-slate-600">{card.description}</p>
            <Link
              to={card.link}
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              {card.linkText}
            </Link>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Fluxo do atendimento</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {["Cadastro", "Fila", "Chamada", "Triagem"].map((etapa, index) => (
            <div key={etapa} className="rounded-lg bg-slate-100 p-4">
              <span className="text-xs font-bold text-blue-600">0{index + 1}</span>
              <p className="mt-1 font-medium text-slate-800">{etapa}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
