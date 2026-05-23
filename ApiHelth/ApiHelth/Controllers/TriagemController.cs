using ApiHelth.DTO;
using ApiHelth.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiHelth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TriagemController : ControllerBase
    {
        private readonly TriagemService _service;

        public TriagemController(TriagemService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TriagemCreateDTO dto)
        {
            try
            {
                var result = await _service.Create(dto);

                if (result == null)
                    return BadRequest(new { message = "Atendimento não encontrado." });

                return Created("", result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
