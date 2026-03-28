using ApiHelth.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiHelth.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Atendimento> Atendimentos { get; set; }
        public DbSet<Triagem> Triagens { get; set; }
        public DbSet<Especialidade> Especialidades { get; set; }
        public DbSet<StatusAtendimento> StatusAtendimentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StatusAtendimento>().HasData(
                new StatusAtendimento { Id = 1, Nome = "Aguardando" },
                new StatusAtendimento { Id = 2, Nome = "Em Triagem" },
                new StatusAtendimento { Id = 3, Nome = "Aguardando Atendimento Médico" },
                new StatusAtendimento { Id = 4, Nome = "Em Atendimento" },
                new StatusAtendimento { Id = 5, Nome = "Em Observação" },
                new StatusAtendimento { Id = 6, Nome = "Finalizado" },
                new StatusAtendimento { Id = 7, Nome = "Cancelado" }
            );

            modelBuilder.Entity<Especialidade>().HasData(
                new Especialidade { Id = 1, Nome = "Clínico Geral" },
                new Especialidade { Id = 2, Nome = "Cardiologia" },
                new Especialidade { Id = 3, Nome = "Ortopedia" },
                new Especialidade { Id = 4, Nome = "Pediatria" },
                new Especialidade { Id = 5, Nome = "Ginecologia" },
                new Especialidade { Id = 6, Nome = "Neurologia" },
                new Especialidade { Id = 7, Nome = "Dermatologia" },
                new Especialidade { Id = 8, Nome = "Oftalmologia" },
                new Especialidade { Id = 9, Nome = "Psiquiatria" },
                new Especialidade { Id = 10, Nome = "Otorrinolaringologia" }
            );

            modelBuilder.Entity<Atendimento>()
                .HasOne(a => a.Triagem)
                .WithOne(t => t.Atendimento)
                .HasForeignKey<Triagem>(t => t.AtendimentoId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
