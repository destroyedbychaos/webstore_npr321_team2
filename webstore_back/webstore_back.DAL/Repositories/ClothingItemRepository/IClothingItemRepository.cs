using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Repositories.ProductRepository
{
    public interface IClothingItemRepository
    {
        Task<ClothingItem?> GetByIdAsync(string id);
        Task<List<ClothingItem?>?> GetByNameAsync(string name);
        Task<List<ClothingItem?>?> GetByManufacturerIdAsync(string manufacturerId);
        Task<List<ClothingItem?>?> GetByManufacturerNameAsync(string manufacturerName);
        Task<ClothingItem?> CreateProductAsync(ClothingItem product);
        IQueryable<ClothingItem> GetAllAsync();
        Task<ClothingItem?> UpdateProductAsync(ClothingItem product);
        Task<ClothingItem?> DeleteProductAsync(string id);
        Task<List<ClothingItem?>?> GetByCategoryNameAsync(string categoryName);
        Task<List<ClothingItem?>?> GetByCategoryIdAsync(string categoryId);
    }
}
