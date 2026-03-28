using ApiHelth.Models;

namespace ApiHelth.Repositories
{
    public interface IPacienteRepository
    {
        Task<Paciente> GetByIdAsync(int id);
        Task<List<Paciente>> GetAllAsync();
        Task AddAsync(Paciente paciente);
        void Update(Paciente paciente);
        void Delete(Paciente paciente);
        Task SaveChangesAsync();
    }
}
