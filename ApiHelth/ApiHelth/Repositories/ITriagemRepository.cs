using ApiHelth.Models;

namespace ApiHelth.Repositories
{
    public interface ITriagemRepository
    {
        Task<List<Triagem>> GetAllAsync();
        Task<Triagem> GetByAtendimentoId(int atendimentoId);
        Task AddAsync(Triagem triagem);
        Task SaveChangesAsync();
    }
}
