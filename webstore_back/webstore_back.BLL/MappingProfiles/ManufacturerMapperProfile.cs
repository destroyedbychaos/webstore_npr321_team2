using AutoMapper;
using webstore_back.BLL.Services.ManufacturerService;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels;
using webstore_back.DAL.ViewModels.ProductManagementVMs;


namespace webstore_back.BLL.MappingProfiles
{
    public class ManufacturerMapperProfile : Profile
    {
        // public ManufacturerMapperProfile(IManufacturerService _manufacturerService) 
        // {
        //     CreateMap<Manufacturer, ManufacturerVM>()
        //         .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
        //         .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
        //         .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating));
        //
        //     CreateMap<ManufacturerVM, Manufacturer>()
        //         .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
        //         .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
        //         .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating))
        //         .AfterMap(async (src, dest) =>
        //         {
        //             var response = await _manufacturerService.GetByNameAsync(src.Name);
        //             if (response.Payload is Manufacturer manufacturer)
        //             {
        //                 dest.ClothingItems = manufacturer.ClothingItems;
        //             }
        //         }); ; ;
        // }
        public ManufacturerMapperProfile()
        {
            CreateMap<Manufacturer, ManufacturerVM>().ReverseMap();
        }
    }
}
