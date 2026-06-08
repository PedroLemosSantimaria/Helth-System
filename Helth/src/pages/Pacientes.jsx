import { useEffect, useMemo, useState } from "react";
import api from "../api/client";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [historico, setHistorico] = useState(null);
  const [loadingHistorico, setLoadingHistorico] = useState(false);
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

  const remover = async (paciente) => {
    const confirmar = window.confirm(`Deseja excluir o paciente ${paciente.nome}?`);

    if (!confirmar) return;

    try {
      setErro("");
      await api.delete(`/Paciente/${paciente.id}`);
      setHistorico(null);
      load();
    } catch (error) {
      const mensagemApi = error.response?.data?.message;
      setErro(mensagemApi || "Nao foi possivel excluir o paciente.");
    }
  };

  const verHistorico = async (pacienteId) => {
    try {
      setErro("");
      setLoadingHistorico(true);
      const res = await api.get(`/Paciente/${pacienteId}/historico`);
      setHistorico(res.data);
    } catch {
      setErro("Nao foi possivel carregar o historico do paciente.");
    } finally {
      setLoadingHistorico(false);
    }
  };

  const pacientesFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return pacientes;

    return pacientes.filter((p) => {
      const nome = p.nome?.toLowerCase() || "";
      const email = p.email?.toLowerCase() || "";
      const telefone = p.telefone?.toLowerCase() || "";

      return nome.includes(termo) || email.includes(termo) || telefone.includes(termo);
    });
  }, [busca, pacientes]);

  const formatarData = (data) => {
    if (!data) return "Data nao informada";
    return new Date(data).toLocaleString("pt-BR");
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
        <div className="grid gap-3 border-b border-slate-200 px-5 py-4 md:grid-cols-[1fr_260px] md:items-center">
          <h3 className="text-lg font-semibold text-slate-900">Pacientes cadastrados</h3>
          <input
            placeholder="Buscar por nome, email ou telefone"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {loading ? (
          <p className="p-5 text-sm text-slate-500">Carregando pacientes...</p>
        ) : pacientesFiltrados.length === 0 ? (
          <p className="p-5 text-sm text-slate-500">Nenhum paciente encontrado.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {pacientesFiltrados.map((p) => (
              <div key={p.id} className="grid gap-3 px-5 py-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-slate-900">{p.nome}</p>
                  <p className="text-xs text-slate-500">ID {p.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">{p.telefone}</p>
                  <p className="text-sm text-slate-600">{p.email}</p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {p.sexo}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => verHistorico(p.id)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Ver historico
                  </button>
                  <button
                    onClick={() => remover(p)}
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {loadingHistorico && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          Carregando historico...
        </div>
      )}

      {historico && (
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Historico de {historico.paciente.nome}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {historico.paciente.email} - {historico.paciente.telefone}
            </p>
          </div>

          {historico.atendimentos.length === 0 ? (
            <p className="p-5 text-sm text-slate-500">Nenhum atendimento encontrado.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {historico.atendimentos.map((atendimento) => (
                <div key={atendimento.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-blue-600">#{atendimento.numeroSequencial}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {atendimento.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatarData(atendimento.dataHoraChegada)}
                    </span>
                  </div>

                  {atendimento.triagem ? (
                    <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                      <p>{atendimento.triagem.sintomas}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {atendimento.triagem.especialidadeNome} - Pressao:{" "}
                        {atendimento.triagem.pressaoArterial || "-"} - Peso:{" "}
                        {atendimento.triagem.peso} kg - Altura: {atendimento.triagem.altura} m
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">Sem triagem registrada.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
