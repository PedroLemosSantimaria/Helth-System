using ApiHelth.Models;

namespace ApiHelth.Repositories
{
    public interface IAtendimentoRepository
    {
        Task<List<Atendimento>> GetAllAsync();
        Task<Atendimento> GetByIdAsync(int id);
        Task<Atendimento> GetProximoAguardandoAsync();
        Task<Atendimento> GetAtualEmTriagemAsync();
        Task AddAsync(Atendimento atendimento);
        void Update(Atendimento atendimento);
        Task<int> GetNextNumeroSequencial();
        Task SaveChangesAsync();
    }
}
