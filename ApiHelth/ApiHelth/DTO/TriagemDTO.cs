namespace ApiHelth.DTO
{
    public class TriagemCreateDTO
    {
        public int AtendimentoId { get; set; }
        public string Sintomas { get; set; }
        public string PressaoArterial { get; set; }
        public decimal Peso { get; set; }
        public decimal Altura { get; set; }
        public int EspecialidadeId { get; set; }
    }

    public class TriagemResponseDTO
    {
        public int Id { get; set; }
        public int AtendimentoId { get; set; }
        public string? PacienteNome { get; set; }
        public string Sintomas { get; set; } = string.Empty;
        public string? PressaoArterial { get; set; }
        public decimal Peso { get; set; }
        public decimal Altura { get; set; }
        public int EspecialidadeId { get; set; }
        public string? EspecialidadeNome { get; set; }
        public string? Status { get; set; }
        public DateTime? DataHoraChegada { get; set; }
    }
}
