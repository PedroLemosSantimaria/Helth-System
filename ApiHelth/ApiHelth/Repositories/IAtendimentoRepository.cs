using ApiHelth.Models;

namespace ApiHelth.Repositories
{
    public interface IAtendimentoRepository
    {
        Task<List<Atendimento>> GetAllAsync();
        Task<Atendimento> GetByIdAsync(int id);
        Task AddAsync(Atendimento atendimento);
        void Update(Atendimento atendimento);
        Task<int> GetNextNumeroSequencial();
        Task SaveChangesAsync();
    }
}
