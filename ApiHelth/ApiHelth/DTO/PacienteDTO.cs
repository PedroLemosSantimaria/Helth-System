namespace ApiHelth.DTO
{
    public class PacienteDTO
    {
        public class PacienteCreateDTO
        {
            public string Nome { get; set; }
            public string Telefone { get; set; }
            public string Sexo { get; set; }
            public string Email { get; set; }
        }

        public class PacienteResponseDTO
        {
            public int Id { get; set; }
            public string Nome { get; set; }
            public string Telefone { get; set; }
        }
    }
}
