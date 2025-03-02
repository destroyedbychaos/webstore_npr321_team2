using AutoMapper;
using webstore_back.BLL.Services.CategoryService;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels.ProductManagementVMs;


namespace webstore_back.BLL.MappingProfiles
{
    public class CategoryMapperProfile : Profile
    {
        public CategoryMapperProfile()
        {
            CreateMap<Category, CategoryVM>().ReverseMap();
        }
    }
}
