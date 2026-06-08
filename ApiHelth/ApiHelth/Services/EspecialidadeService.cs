using ApiHelth.DTO;
using ApiHelth.Repositories;

namespace ApiHelth.Services
{
    public class EspecialidadeService
    {
        private readonly IEspecialidadeRepository _repository;

        public EspecialidadeService(IEspecialidadeRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EspecialidadeResponseDTO>> GetAll()
        {
            var especialidades = await _repository.GetAllAsync();

            return especialidades.Select(e => new EspecialidadeResponseDTO
            {
                Id = e.Id,
                Nome = e.Nome
            }).ToList();
        }
    }
}
