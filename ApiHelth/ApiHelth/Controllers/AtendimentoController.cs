using ApiHelth.DTO;
using ApiHelth.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiHelth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtendimentoController : ControllerBase
    {
        private readonly AtendimentoService _service;

        public AtendimentoController(AtendimentoService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(AtendimentoCreateDTO dto)
        {
            var result = await _service.Create(dto);

            if (result == null)
                return BadRequest(new { message = "Paciente inválido" });

            return Created("", result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet("fila")]
        public async Task<IActionResult> GetFila()
        {
            var result = await _service.GetFilaAtual();
            return Ok(result);
        }

        [HttpGet("atual")]
        public async Task<IActionResult> GetAtual()
        {
            var result = await _service.GetAtendimentoAtual();

            if (result == null)
                return NotFound(new { message = "Nenhum paciente em triagem" });

            return Ok(result);
        }

        [HttpPost("chamar-proximo")]
        public async Task<IActionResult> ChamarProximo()
        {
            var result = await _service.ChamarProximoPaciente();

            if (result == null)
                return NotFound(new { message = "Fila vazia" });

            return Ok(result);
        }

        [HttpPatch("{id}/finalizar")]
        public async Task<IActionResult> Finalizar(int id)
        {
            var result = await _service.Finalizar(id);

            if (result == null)
                return NotFound(new { message = "Atendimento não encontrado" });

            return Ok(result);
        }
    }
}
