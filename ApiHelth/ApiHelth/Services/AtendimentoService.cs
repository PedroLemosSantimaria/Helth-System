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
                PacienteNome = paciente.Nome,
                Status = "Aguardando",
                DataHoraChegada = atendimento.DataHoraChegada
            };
        }

        public async Task<List<AtendimentoResponseDTO>> GetAll()
        {
            var atendimentos = await _repository.GetAllAsync();

            return atendimentos
                .OrderByDescending(a => a.DataHoraChegada)
                .Select(MapToResponse)
                .ToList();
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
                PacienteNome = proximo.Paciente?.Nome,
                Status = "Em Triagem",
                DataHoraChegada = proximo.DataHoraChegada
            };
        }

        public async Task<AtendimentoResponseDTO> GetAtendimentoAtual()
        {
            var atendimentos = await _repository.GetAllAsync();

            var atual = atendimentos
                .Where(a => a.StatusAtendimentoId == 2)
                .OrderBy(a => a.NumeroSequencial)
                .FirstOrDefault();

            return atual == null ? null : MapToResponse(atual);
        }

        public async Task<AtendimentoResponseDTO> Finalizar(int id)
        {
            var atendimento = await _repository.GetByIdAsync(id);

            if (atendimento == null)
                return null;

            atendimento.StatusAtendimentoId = 6;

            _repository.Update(atendimento);
            await _repository.SaveChangesAsync();

            atendimento.StatusAtendimento = new StatusAtendimento { Id = 6, Nome = "Finalizado" };

            return MapToResponse(atendimento);
        }

        private AtendimentoResponseDTO MapToResponse(Atendimento atendimento)
        {
            return new AtendimentoResponseDTO
            {
                Id = atendimento.Id,
                NumeroSequencial = atendimento.NumeroSequencial,
                PacienteId = atendimento.PacienteId,
                PacienteNome = atendimento.Paciente?.Nome,
                Status = atendimento.StatusAtendimento?.Nome,
                DataHoraChegada = atendimento.DataHoraChegada
            };
        }
    }
}
