using ApiHelth.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiHelth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EspecialidadeController : ControllerBase
    {
        private readonly EspecialidadeService _service;

        public EspecialidadeController(EspecialidadeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }
    }
}
