using AutoMapper;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.AspNetCore.Routing.Constraints;
using webstore_back.BLL.Services.CategoryService;
using webstore_back.BLL.Services.ManufacturerService;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels;
using webstore_back.DAL.ViewModels.ProductManagementVMs;


namespace webstore_back.BLL.MappingProfiles
{
    public class ClothingItemMapperProfile : Profile
    {
        public ClothingItemMapperProfile(ICategoryService _categoryService, IManufacturerService _manufacturerService)
        {
            CreateMap<ClothingItem, ClothingItemVM>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.StockQuantity, opt => opt.MapFrom(src => src.StockQuantity))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Manufacturer, opt => opt.MapFrom(src => src.Manufacturer.Name));

            CreateMap<ClothingItemVM, ClothingItem>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.StockQuantity, opt => opt.MapFrom(src => src.StockQuantity))
                .ForMember(dest => dest.Category, opt => opt.Ignore())
                .ForMember(dest => dest.Manufacturer, opt => opt.Ignore())
                .AfterMap(async (src, dest) =>
                {
                    var response1 = await _categoryService.GetByNameAsync(src.Category);
                    if (response1.Payload is Category category)
                    {
                        dest.CategoryId = category.Id;
                        dest.Category = category;
                    }
                    var response2 = await _manufacturerService.GetByNameAsync(src.Manufacturer);
                    if (response2.Payload is Manufacturer manufacturer)
                    {
                        dest.ManufacturerId = manufacturer.Id;
                        dest.Manufacturer = manufacturer;
                    }
                }); ;
        }
    }
}
