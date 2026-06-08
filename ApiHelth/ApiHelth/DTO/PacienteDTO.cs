namespace ApiHelth.DTO
{
    public class PacienteDTO
    {
        public class PacienteCreateDTO
        {
            public string Nome { get; set; } = string.Empty;
            public string Telefone { get; set; } = string.Empty;
            public string Sexo { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
        }

        public class PacienteResponseDTO
        {
            public int Id { get; set; }
            public string Nome { get; set; } = string.Empty;
            public string Telefone { get; set; } = string.Empty;
            public string Sexo { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
        }

        public class PacienteHistoricoDTO
        {
            public PacienteResponseDTO Paciente { get; set; } = new();
            public List<PacienteAtendimentoHistoricoDTO> Atendimentos { get; set; } = new();
        }

        public class PacienteAtendimentoHistoricoDTO
        {
            public int Id { get; set; }
            public int NumeroSequencial { get; set; }
            public string? Status { get; set; }
            public DateTime DataHoraChegada { get; set; }
            public PacienteTriagemHistoricoDTO? Triagem { get; set; }
        }

        public class PacienteTriagemHistoricoDTO
        {
            public int Id { get; set; }
            public string Sintomas { get; set; } = string.Empty;
            public string? PressaoArterial { get; set; }
            public decimal Peso { get; set; }
            public decimal Altura { get; set; }
            public string? EspecialidadeNome { get; set; }
        }
    }
}
