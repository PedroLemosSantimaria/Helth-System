namespace ApiHelth.DTO
{
    public class AtendimentoCreateDTO
    {
        public int PacienteId { get; set; }
    }

    public class AtendimentoResponseDTO
    {
        public int Id { get; set; }
        public int NumeroSequencial { get; set; }
        public int PacienteId { get; set; }
        public string Status { get; set; }
        public string PacienteNome { get; set; }
        public DateTime DataHoraChegada { get; set; }
    }
}
