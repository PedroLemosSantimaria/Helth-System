using ApiHelth.Models;

namespace ApiHelth.Repositories
{
    public interface IEspecialidadeRepository
    {
        Task<List<Especialidade>> GetAllAsync();
    }
}
