using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Repositories.ProductRepository
{
    public interface IProductRepository
    {
        Task<Product?> GetByIdAsync(string id);
        Task<List<Product?>?> GetByNameAsync(string name);
        Task<List<Product?>?> GetByManufacturerIdAsync(string manufacturerId);
        Task<List<Product?>?> GetByManufacturerNameAsync(string manufacturerName);
        Task<Product?> CreateProductAsync(Product product);
        IQueryable<Product> GetAllAsync();
        Task<Product?> UpdateProductAsync(Product product);
        Task<Product?> DeleteProductAsync(string id);
        Task<List<Product?>?> GetByCategoryNameAsync(string categoryName);
        Task<List<Product?>?> GetByCategoryIdAsync(string categoryId);
    }
}
