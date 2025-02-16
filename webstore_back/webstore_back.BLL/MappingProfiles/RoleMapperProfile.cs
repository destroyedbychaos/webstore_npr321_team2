using AutoMapper;
using Webstore.DAL.Models.Identity;
using Webstore.DAL.ViewModels;

namespace Webstore.BLL.MappingProfiles
{
    public class RoleMapperProfile : Profile
    {
        public RoleMapperProfile() 
        {
            // Role -> RoleVM
            CreateMap<Role, RoleVM>();

            // RoleVM -> Role
            CreateMap<RoleVM, Role>();
        }
    }
}
