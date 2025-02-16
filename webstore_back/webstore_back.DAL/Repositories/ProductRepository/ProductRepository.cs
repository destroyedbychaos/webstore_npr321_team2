using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Data;
using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Repositories.ProductRepository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _appDbContext;

        public ProductRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Product?> GetByIdAsync(string id)
        {
            return await _appDbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Product>> GetByNameAsync(string name)
        {
            return await _appDbContext.Products.Where(p => p.Name.Contains(name)).ToListAsync();
        }

        public async Task<List<Product>> GetByManufacturerIdAsync(string manufacturerId)
        {
            return await _appDbContext.Products.Where(p => p.ManufacturerId == manufacturerId).ToListAsync();
        }

        public async Task<List<Product>> GetByManufacturerNameAsync(string manufacturerName)
        {
            return await _appDbContext.Products.Where(p => p.Manufacturer.Name.Contains(manufacturerName)).ToListAsync();
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            _appDbContext.Products.Add(product);
            await _appDbContext.SaveChangesAsync();
            return product;
        }

        public IQueryable<Product> GetAllAsync()
        {
            return _appDbContext.Products;
        }

        public async Task<Product?> UpdateProductAsync(Product product)
        {
            var existingProduct = await _appDbContext.Products.FindAsync(product.Id);
            if (existingProduct == null)
            {
                return null;
            }

            await _appDbContext.Products.AddAsync(product);
            await _appDbContext.SaveChangesAsync();

            return existingProduct;
        }

        public async Task<Product?> DeleteProductAsync(string id)
        {
            var product = await _appDbContext.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }

            _appDbContext.Products.Remove(product);
            await _appDbContext.SaveChangesAsync();

            return product;
        }

        public async Task<List<Product?>?> GetByCategoryNameAsync(string categoryName)
        {
            return await _appDbContext.Products.Where(p => p.Category.Name == categoryName).ToListAsync();
        }

        public async Task<List<Product?>?> GetByCategoryIdAsync(string categoryId)
        {
            return await _appDbContext.Products.Where(p => p.CategoryId == categoryId).ToListAsync();
        }
    }
}
