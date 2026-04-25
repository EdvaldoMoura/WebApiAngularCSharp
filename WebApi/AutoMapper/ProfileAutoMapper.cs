using AutoMapper;
using WebApi.Dto;
using WebApi.Models;

namespace WebApi.AutoMapper
{
    public class ProfileAutoMapper : Profile
    {
        public ProfileAutoMapper()
        {
            CreateMap<Usuarios, UsuarioListarDto>().ReverseMap();
        }
    }
}
