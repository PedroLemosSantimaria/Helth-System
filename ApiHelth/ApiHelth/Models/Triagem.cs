using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiHelth.Models
{
    public class Triagem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AtendimentoId { get; set; }

        [ForeignKey("AtendimentoId")]
        public Atendimento Atendimento { get; set; }

        [Required]
        [MaxLength(500)]
        public string Sintomas { get; set; }

        [MaxLength(20)]
        public string PressaoArterial { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal Peso { get; set; }

        [Column(TypeName = "decimal(4,2)")]
        public decimal Altura { get; set; } 

        [Required]
        public int EspecialidadeId { get; set; }

        [ForeignKey("EspecialidadeId")]
        public Especialidade Especialidade { get; set; }
    }
}
