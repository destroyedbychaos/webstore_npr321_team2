using AutoMapper;
using webstore_back.BLL.Services.CategoryService;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels.ProductManagementVMs;


namespace webstore_back.BLL.MappingProfiles
{
    public class CategoryMapperProfile : Profile
    {
        // public CategoryMapperProfile(ICategoryService _categoryService)
        // {
        //     CreateMap<Category, CategoryVM>()
        //         .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
        //         .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
        //
        //     CreateMap<CategoryVM, Category>()
        //         .ForMember(dest => dest.ClothingItems, opt => opt.Ignore())
        //         .AfterMap(async (src, dest) =>
        //         {
        //                var response = await _categoryService.GetCategoryClothingItemsById(src.Id);
        //                if (response.Payload is Category category)
        //                {
        //                    dest.ClothingItems = category.ClothingItems;
        //                }
        //         });
        // }
        public CategoryMapperProfile()
        {
            CreateMap<Category, CategoryVM>().ReverseMap();
        }
    }
}
