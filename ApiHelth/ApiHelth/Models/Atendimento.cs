using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiHelth.Models
{
    public class Atendimento
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int NumeroSequencial { get; set; }

        [Required]
        public int PacienteId { get; set; }

        [ForeignKey("PacienteId")]
        public Paciente Paciente { get; set; }

        [Required]
        public DateTime DataHoraChegada { get; set; }

        [Required]
        public int StatusAtendimentoId { get; set; }

        [ForeignKey("StatusAtendimentoId")]
        public StatusAtendimento StatusAtendimento { get; set; }

        public Triagem Triagem { get; set; }
    }
}
