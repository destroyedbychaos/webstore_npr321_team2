using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Repositories.CategoryRepository
{
    public interface ICategoryRepository
    {
        Task<Category?> GetByIdAsync(string id);
        Task<Category?> GetByNameAsync(string name);
        Task<Category?> CreateCategoryAsync (Category category);
        IQueryable<Category> GetAllAsync();
        Task<Category?> UpdateCategoryAsync (Category category); 
        Task<Category?> DeleteCategoryAsync (string id);
    }
}
