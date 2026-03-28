import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import Atendimento from "./pages/Atendimento";
import Triagem from "./pages/Triagem";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/triagem" element={<Triagem />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}