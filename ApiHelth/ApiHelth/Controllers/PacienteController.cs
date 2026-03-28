using ApiHelth.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using static ApiHelth.DTO.PacienteDTO;

namespace ApiHelth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacienteController : ControllerBase
    {
        private readonly PacienteService _service;
        private readonly AtendimentoService _serviceAtendimento;

        public PacienteController(PacienteService service,AtendimentoService serviceAtendimento)
        {
            _service = service;
            _serviceAtendimento = serviceAtendimento;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PacienteCreateDTO dto)
        {
            var result = await _service.Create(dto);

            var fila = await _serviceAtendimento.Create(new DTO.AtendimentoCreateDTO
            {
                PacienteId = result.Id
            });

            return CreatedAtAction(
                nameof(GetById),
                new { id = result.Id },
                result
            );
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);

            if (result == null)
                return NotFound(new { message = "Paciente não encontrado" });

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PacienteCreateDTO dto)
        {
            var result = await _service.Update(id,dto);

            if (result == null)
                return NotFound(new { message = "Paciente não encontrado" });

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           var result = await _service.Delete(id);

            if (!result)
                return NotFound(new { message = "Paciente não encontrado" });

            return NoContent();
        }
    }
}
