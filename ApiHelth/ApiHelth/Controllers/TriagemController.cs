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

        [HttpPost]
        public async Task<IActionResult> Create(TriagemCreateDTO dto)
        {
            try
            {
                var result = await _service.Create(dto);

                if (result == null)
                    return BadRequest(new { message = "Atendimento inválido" });

                return Created("", result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
