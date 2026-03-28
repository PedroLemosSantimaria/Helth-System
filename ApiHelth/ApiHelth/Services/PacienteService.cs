using ApiHelth.Models;
using ApiHelth.Repositories;
using static ApiHelth.DTO.PacienteDTO;

namespace ApiHelth.Services
{
    public class PacienteService
    {
        private readonly IPacienteRepository _repository;

        public PacienteService(IPacienteRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<PacienteResponseDTO>> GetAll()
        {
            var pacientes = await _repository.GetAllAsync();

            return pacientes.Select(p => new PacienteResponseDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Telefone = p.Telefone
            }).ToList();
        }

        public async Task<PacienteResponseDTO> GetByIdAsync(int id)
        {
            var paciente  = await _repository.GetByIdAsync(id);

            if (paciente == null)
                return null;

            return new PacienteResponseDTO
            {
                Id = paciente.Id,
                Nome = paciente.Nome,
                Telefone = paciente.Telefone
            };
        }

        public async Task<PacienteResponseDTO> Create(PacienteCreateDTO dto)
        {
            var paciente = new Paciente
            {
                Nome = dto.Nome,
                Telefone = dto.Telefone,
                Sexo = dto.Sexo,
                Email = dto.Email
            };

            await _repository.AddAsync(paciente);
            await _repository.SaveChangesAsync();

            return new PacienteResponseDTO
            {
                Id = paciente.Id,
                Nome = paciente.Nome,
                Telefone = paciente.Telefone
            };
        }

        public async Task<PacienteResponseDTO> Update(int id,PacienteCreateDTO dto)
        {
            var paciente = await _repository.GetByIdAsync(id);

            if (paciente == null)
                return null;


            paciente.Nome = dto.Nome;
            paciente.Telefone = dto.Telefone;
            paciente.Sexo = dto.Sexo;
            paciente.Email = dto.Email;

            _repository.Update(paciente);
            await _repository.SaveChangesAsync();

            return new PacienteResponseDTO
            {
                Id = paciente.Id,
                Nome = paciente.Nome,
                Telefone = paciente.Telefone
            };
        }

        public async Task<bool> Delete(int id)
        {
            var paciente = await _repository.GetByIdAsync(id);

            if (paciente == null)
                return false;

            _repository.Delete(paciente);
            await _repository.SaveChangesAsync();

            return true;
        }

    }
}
