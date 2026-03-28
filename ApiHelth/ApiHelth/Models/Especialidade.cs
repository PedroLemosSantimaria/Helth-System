using System.ComponentModel.DataAnnotations;

namespace ApiHelth.Models
{
    public class Especialidade
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        public ICollection<Triagem> Triagens { get; set; }
    }
}
