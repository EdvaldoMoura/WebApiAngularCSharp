using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Npgsql;
using WebApi.Dto;
using WebApi.Models;

namespace WebApi.Services
{
    public class UsuarioService : IUsuarioInterface
    {

        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UsuarioService(IConfiguration configuration, IMapper mapper)
        {
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<Response<Usuarios>> BuscarUsuarioPorId(int idUsuario)
        {
            Response<Usuarios> response = new Response<Usuarios>();

            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var usuarioBanco = await connection.QueryFirstOrDefaultAsync<Usuarios>("SELECT * FROM usuarios WHERE id = @Id", new { Id = idUsuario });

                if (usuarioBanco == null)
                {
                    response.Mensagem = "Usuário não encontrado.";
                    response.Status = false;
                    return response;
                }
                // Mapear os dados do banco para o DTO
               // var usuarioMapeado = _mapper.Map<UsuarioListarDto>(usuarioBanco);
                response.Dados = usuarioBanco;
                response.Mensagem = "Usuário encontrado com sucesso.";
            }
            return response;
        }

        public async Task<Response<List<Usuarios>>> BuscarUsuarios()
        {

            Response<List<Usuarios>> response = new Response<List<Usuarios>>();

            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var usuariosBanco = await connection.QueryAsync<Usuarios>("SELECT * FROM usuarios");
                //var usuariosBanco2 = await connection.QueryAsync<Usuarios>("SELECT * FROM usuarios");

                if (usuariosBanco == null)
                {

                    response.Mensagem = "Usuários não encontrados.";
                    response.Status = false;
                    return response;
                }

                // Mapear os dados do banco para a lista de DTOs
                //var usuarioMapeado = _mapper.Map<List<UsuarioListarDto>>(usuariosBanco);

                response.Dados = usuariosBanco.ToList();
                //response.Dados = usuarioMapeado;
                response.Mensagem = "Usuários encontrados com sucesso.";

            }
            return response;

        }

        public async Task<Response<List<UsuarioListarDto>>> CriarUsuario(CriarUsuarioDto criarUsuarioDto)
        {
            Response<List<UsuarioListarDto>> response = new Response<List<UsuarioListarDto>>();

            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var usuarioBanco = await connection.ExecuteAsync(
                    "insert into Usuarios (nome, email, cargo, salario, cpf, situacao, senha)"
                    + "values (@nome, @email, @cargo, @salario, @cpf, @situacao, @senha)", criarUsuarioDto);

                if (usuarioBanco == 0)
                {
                    response.Mensagem = "Erro ao criar usuário.";
                    response.Status = false;
                    return response;
                }

                var usuarios = await ListarUsuarios(connection);
                var usuariosMapeados = _mapper.Map<List<UsuarioListarDto>>(usuarios);

                response.Dados = usuariosMapeados;
                response.Mensagem = "Usuário criado com sucesso e listados.";
            }
            return response;
        }

        private static async Task<IEnumerable<Usuarios>> ListarUsuarios(NpgsqlConnection connection)
        {
            return await connection.QueryAsync<Usuarios>("SELECT * FROM usuarios");
        }

        public async Task<Response<List<UsuarioListarDto>>> UsuarioEditar(UsuarioEditarDto usuarioEditarDto)
        {
           Response<List<UsuarioListarDto>> response = new Response<List<UsuarioListarDto>>();

            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var usuarioBanco = await connection.ExecuteAsync(
                    "UPDATE usuarios SET nome = @Nome, email = @Email, cargo = @Cargo, salario = @Salario," +
                    "cpf = @Cpf, situacao = @Situacao WHERE id = @Id", usuarioEditarDto);

                if (usuarioBanco == 0)
                {
                    response.Mensagem = "Erro ao editar usuário.";
                    response.Status = false;
                    return response;
                }
                var usuarios = ListarUsuarios(connection).Result;
                var usuariosMapeados = _mapper.Map<List<UsuarioListarDto>>(usuarios);
                response.Dados = usuariosMapeados;
                response.Mensagem = "Usuário editado com sucesso e listados.";
            }
            return response;
        }

        public async Task<Response<List<UsuarioListarDto>>> RemoverUsuario(int idUsuario)
        {
           Response<List<UsuarioListarDto>> response = new Response<List<UsuarioListarDto>>();

            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var usuarioBanco = await connection.ExecuteAsync(
                    "DELETE FROM usuarios WHERE id = @id", new { id = idUsuario });

                if (usuarioBanco == 0)
                {
                    response.Mensagem = "Erro ao remover usuário.";
                    response.Status = false;
                    return response ;
                }

                var usuarios = ListarUsuarios(connection).Result;
                var usuariosMapeados = _mapper.Map<List<UsuarioListarDto>>(usuarios);
                response.Dados = usuariosMapeados;
                response.Mensagem = "Usuário removido com sucesso. lista atualizada.";
            }
            return response ;
        }
    }
}
