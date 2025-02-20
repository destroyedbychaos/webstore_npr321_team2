using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels.ProductManagementVMs;

namespace webstore_back.BLL.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByNameAsync(string name);
        Task<ServiceResponse> CreateCategoryAsync(CategoryVM model);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> UpdateCategoryAsync(CategoryVM model);
        Task<ServiceResponse> DeleteCategoryAsync(string id);
        Task<ServiceResponse> GetCategoryClothingItemsById(string id);
    }
}
