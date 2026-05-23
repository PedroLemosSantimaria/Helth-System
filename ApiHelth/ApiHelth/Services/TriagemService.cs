using ApiHelth.DTO;
using ApiHelth.Models;
using ApiHelth.Repositories;

namespace ApiHelth.Services
{
    public class TriagemService
    {
        private readonly ITriagemRepository _triagemRepository;
        private readonly IAtendimentoRepository _atendimentoRepository;

        public TriagemService(
            ITriagemRepository triagemRepository,
            IAtendimentoRepository atendimentoRepository)
        {
            _triagemRepository = triagemRepository;
            _atendimentoRepository = atendimentoRepository;
        }

        public async Task<List<TriagemResponseDTO>> GetAll()
        {
            var triagens = await _triagemRepository.GetAllAsync();

            return triagens.Select(t => new TriagemResponseDTO
            {
                Id = t.Id,
                AtendimentoId = t.AtendimentoId,
                PacienteNome = t.Atendimento?.Paciente?.Nome,
                Sintomas = t.Sintomas,
                PressaoArterial = t.PressaoArterial,
                Peso = t.Peso,
                Altura = t.Altura,
                EspecialidadeId = t.EspecialidadeId,
                EspecialidadeNome = t.Especialidade?.Nome,
                Status = t.Atendimento?.StatusAtendimento?.Nome,
                DataHoraChegada = t.Atendimento?.DataHoraChegada
            }).ToList();
        }

        public async Task<TriagemResponseDTO> Create(TriagemCreateDTO dto)
        {
            var atendimento = await _atendimentoRepository.GetByIdAsync(dto.AtendimentoId);

            if (atendimento == null)
                return null;

            var triagemExistente = await _triagemRepository.GetByAtendimentoId(dto.AtendimentoId);

            if (triagemExistente != null)
                throw new Exception("Atendimento já possui triagem");

            var triagem = new Triagem
            {
                AtendimentoId = dto.AtendimentoId,
                Sintomas = dto.Sintomas,
                PressaoArterial = dto.PressaoArterial,
                Peso = dto.Peso,
                Altura = dto.Altura,
                EspecialidadeId = dto.EspecialidadeId
            };

            await _triagemRepository.AddAsync(triagem);

            atendimento.StatusAtendimentoId = 3; 
            _atendimentoRepository.Update(atendimento);

            await _triagemRepository.SaveChangesAsync();

            return new TriagemResponseDTO
            {
                Id = triagem.Id,
                AtendimentoId = triagem.AtendimentoId,
                Sintomas = triagem.Sintomas,
                PressaoArterial = triagem.PressaoArterial,
                Peso = triagem.Peso,
                Altura = triagem.Altura,
                EspecialidadeId = triagem.EspecialidadeId
            };
        }
    }
}
