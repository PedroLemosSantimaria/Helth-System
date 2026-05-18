import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "D" },
  { to: "/pacientes", label: "Pacientes", icon: "P" },
  { to: "/atendimento", label: "Fila", icon: "F" },
  { to: "/triagem", label: "Triagem", icon: "T" },
];

export default function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-5">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Sistema Hospitalar
        </p>
        <h1 className="mt-1 text-xl font-bold text-slate-900">Health System</h1>
      </div>

      <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <span className="grid h-6 w-6 place-items-center rounded-md bg-white/20 text-xs font-bold">
              {link.icon}
            </span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
