using ApiHelth.DTO;
using ApiHelth.Models;
using ApiHelth.Repositories;

namespace ApiHelth.Services
{
    public class AtendimentoService
    {
        private readonly IAtendimentoRepository _repository;
        private readonly IPacienteRepository _pacienteRepository;

        public AtendimentoService(
            IAtendimentoRepository repository,
            IPacienteRepository pacienteRepository)
        {
            _repository = repository;
            _pacienteRepository = pacienteRepository;
        }

        public async Task<AtendimentoResponseDTO> Create(AtendimentoCreateDTO dto)
        {
            var paciente = await _pacienteRepository.GetByIdAsync(dto.PacienteId);

            if (paciente == null)
                return null;

            var numero = await _repository.GetNextNumeroSequencial();

            var atendimento = new Atendimento
            {
                PacienteId = dto.PacienteId,
                NumeroSequencial = numero,
                DataHoraChegada = DateTime.Now,
                StatusAtendimentoId = 1 
            };

            await _repository.AddAsync(atendimento);
            await _repository.SaveChangesAsync();

            return new AtendimentoResponseDTO
            {
                Id = atendimento.Id,
                NumeroSequencial = atendimento.NumeroSequencial,
                PacienteId = atendimento.PacienteId,
                Status = "Aguardando",
                DataHoraChegada = atendimento.DataHoraChegada
            };
        }

        public async Task<List<AtendimentoResponseDTO>> GetFilaAtual()
        {
            var atendimentos = await _repository.GetAllAsync();

            var fila = atendimentos
                .Where(a => a.StatusAtendimentoId == 1)
                .OrderBy(a => a.NumeroSequencial)
                .Select(a => new AtendimentoResponseDTO
                {
                    Id = a.Id,
                    NumeroSequencial = a.NumeroSequencial,
                    PacienteId = a.PacienteId,
                    Status = a.StatusAtendimento.Nome,
                    DataHoraChegada = a.DataHoraChegada,
                    PacienteNome = a.Paciente.Nome
                })
                .ToList();

            return fila;
        }

        public async Task<AtendimentoResponseDTO> ChamarProximoPaciente()
        {
            var atendimentos = await _repository.GetAllAsync();

            var proximo = atendimentos
                .Where(a => a.StatusAtendimentoId == 1)
                .OrderBy(a => a.NumeroSequencial)
                .FirstOrDefault();

            if (proximo == null)
                return null;

            proximo.StatusAtendimentoId = 2;

            _repository.Update(proximo);
            await _repository.SaveChangesAsync();

            return new AtendimentoResponseDTO
            {
                Id = proximo.Id,
                NumeroSequencial = proximo.NumeroSequencial,
                PacienteId = proximo.PacienteId,
                Status = "Em Triagem",
                DataHoraChegada = proximo.DataHoraChegada
            };
        }
    }
}
