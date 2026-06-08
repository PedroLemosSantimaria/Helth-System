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
                Telefone = p.Telefone,
                Sexo = p.Sexo,
                Email = p.Email
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
                Telefone = paciente.Telefone,
                Sexo = paciente.Sexo,
                Email = paciente.Email
            };
        }

        public async Task<PacienteHistoricoDTO> GetHistorico(int id)
        {
            var paciente = await _repository.GetByIdWithHistoricoAsync(id);

            if (paciente == null)
                return null;

            return new PacienteHistoricoDTO
            {
                Paciente = new PacienteResponseDTO
                {
                    Id = paciente.Id,
                    Nome = paciente.Nome,
                    Telefone = paciente.Telefone,
                    Sexo = paciente.Sexo,
                    Email = paciente.Email
                },
                Atendimentos = paciente.Atendimentos
                    .OrderByDescending(a => a.DataHoraChegada)
                    .Select(a => new PacienteAtendimentoHistoricoDTO
                    {
                        Id = a.Id,
                        NumeroSequencial = a.NumeroSequencial,
                        Status = a.StatusAtendimento?.Nome,
                        DataHoraChegada = a.DataHoraChegada,
                        Triagem = a.Triagem == null ? null : new PacienteTriagemHistoricoDTO
                        {
                            Id = a.Triagem.Id,
                            Sintomas = a.Triagem.Sintomas,
                            PressaoArterial = a.Triagem.PressaoArterial,
                            Peso = a.Triagem.Peso,
                            Altura = a.Triagem.Altura,
                            EspecialidadeNome = a.Triagem.Especialidade?.Nome
                        }
                    }).ToList()
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
                Telefone = paciente.Telefone,
                Sexo = paciente.Sexo,
                Email = paciente.Email
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
                Telefone = paciente.Telefone,
                Sexo = paciente.Sexo,
                Email = paciente.Email
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
