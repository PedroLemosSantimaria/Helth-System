import Paciente from "../pages/Pacientes";
import Fila from "../pages/Atendimento";
import Triagem from "../pages/Triagem";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <br /><br />
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow"></div>
        <Paciente></Paciente><br /><br />
        <div className="bg-white p-6 rounded-xl shadow"></div>
        <Fila></Fila>
      </div>
    </div>
  );
}