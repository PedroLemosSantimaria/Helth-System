import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-xl p-5">
      <h1 className="text-2xl font-bold mb-8 text-blue-600">🏥 Health System</h1>
      <nav className="flex flex-col gap-4 text-gray-700">
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/pacientes" className="hover:text-blue-600">Pacientes</Link>
        <Link to="/atendimento" className="hover:text-blue-600">Fila</Link>
        <Link to="/triagem" className="hover:text-blue-600">Triagem</Link>
      </nav>
    </div>
  );
}