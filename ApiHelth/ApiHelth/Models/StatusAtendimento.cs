using System.ComponentModel.DataAnnotations;

namespace ApiHelth.Models
{
    public class StatusAtendimento
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nome { get; set; }

        public ICollection<Atendimento> Atendimentos { get; set; }
    }
}
