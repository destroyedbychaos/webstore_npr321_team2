using AutoMapper;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels.ProductManagementVMs;


namespace webstore_back.BLL.MappingProfiles
{
    public class ClothingItemMapperProfile : Profile
    {
        public ClothingItemMapperProfile()
        {
            CreateMap<ClothingItem, ClothingItemVM>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name ?? ""))
                .ForMember(dest => dest.Manufacturer, opt => opt.MapFrom(src => src.Manufacturer.Name ?? ""));
        }
    }
}
