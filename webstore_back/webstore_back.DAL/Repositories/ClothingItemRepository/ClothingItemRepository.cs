using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Data;
using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Repositories.ClothingItemRepository
{
    public class ClothingItemRepository : IClothingItemRepository
    {
        private readonly AppDbContext _appDbContext;

        public ClothingItemRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<ClothingItem?> GetByIdAsync(string id)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<ClothingItem>> GetByNameAsync(string name)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.Name.Contains(name)).ToListAsync();
        }

        public async Task<List<ClothingItem>> GetByManufacturerIdAsync(string manufacturerId)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.ManufacturerId == manufacturerId).ToListAsync();
        }

        public async Task<List<ClothingItem>> GetByManufacturerNameAsync(string manufacturerName)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.Manufacturer.Name.Contains(manufacturerName))
                .ToListAsync();
        }

        public async Task<ClothingItem> CreateProductAsync(ClothingItem product)
        {
            await _appDbContext.ClothingItems.AddAsync(product);
            await _appDbContext.SaveChangesAsync();
            return product;
        }

        public IQueryable<ClothingItem> GetAllAsync()
        {
            return _appDbContext.ClothingItems.Include(c => c.Images);
        }

        public async Task<ClothingItem?> UpdateProductAsync(ClothingItem product)
        {
            _appDbContext.ClothingItems.Update(product);
            await _appDbContext.SaveChangesAsync();

            return product;
        }

        public async Task<ClothingItem?> DeleteProductAsync(string id)
        {
            var product = await _appDbContext.ClothingItems.FindAsync(id);
            if (product == null)
            {
                return null;
            }

            _appDbContext.ClothingItems.Remove(product);
            await _appDbContext.SaveChangesAsync();

            return product;
        }

        public async Task<List<ClothingItem>> GetByCategoryNameAsync(string categoryName)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.Category.Name == categoryName).ToListAsync();
        }

        public async Task<List<ClothingItem>> GetByCategoryIdAsync(string categoryId)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.CategoryId == categoryId).ToListAsync();
        }
    }
}