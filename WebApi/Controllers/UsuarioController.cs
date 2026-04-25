using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dto;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioInterface _usuarioInterface;

        public UsuarioController(IUsuarioInterface usuarioInterface)
        {
            _usuarioInterface = usuarioInterface;
        }
    
        [HttpGet()]
        public async Task<IActionResult> BuscarTodosUsuarios()
        {
            var response = await _usuarioInterface.BuscarUsuarios();

            if (response.Status == false)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
        [HttpGet("{idUsuario}")]
        public async Task<IActionResult> BuscarUsuarioPorId(int idUsuario)
        {
            var response = await _usuarioInterface.BuscarUsuarioPorId(idUsuario);

            if (response.Status == false)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost()]
        public async Task<IActionResult> CriarUsuario(CriarUsuarioDto criarUsuarioDto)
        {
            var response = await _usuarioInterface.CriarUsuario(criarUsuarioDto);

            if (response.Status == false)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPut()]
        public async Task<IActionResult> UsuarioEditar(UsuarioEditarDto usuarioEditarDto)
        {
            var response = await _usuarioInterface.UsuarioEditar(usuarioEditarDto);

            if (response.Status == false)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpDelete("{idUsuario}")]
        public async Task<IActionResult> RemoverUsuario(int idUsuario)
        {
            var response = await _usuarioInterface.RemoverUsuario(idUsuario);

            if (response.Status == false)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
