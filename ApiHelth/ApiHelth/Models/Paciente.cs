using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiHelth.Models
{
    public class Paciente
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Nome { get; set; }

        [Required]
        [MaxLength(20)]
        public string Telefone { get; set; }

        [Required]
        [MaxLength(20)]
        public string Sexo { get; set; } 

        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; }

        public ICollection<Atendimento> Atendimentos { get; set; }
    }
}
