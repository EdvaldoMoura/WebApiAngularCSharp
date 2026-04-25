using WebApi.Dto;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IUsuarioInterface
    {
        Task<Response<List<Usuarios>>> BuscarUsuarios();
        Task<Response<Usuarios>> BuscarUsuarioPorId(int idUsuario);
        Task<Response<List<UsuarioListarDto>>> CriarUsuario(CriarUsuarioDto criarUsuarioDto);
        Task<Response<List<UsuarioListarDto>>> UsuarioEditar(UsuarioEditarDto usuarioEditarDto);
        Task<Response<List<UsuarioListarDto>>> RemoverUsuario(int idUsuario);
    }
}
