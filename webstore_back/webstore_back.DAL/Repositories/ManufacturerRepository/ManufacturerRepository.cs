using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Data;
using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Repositories.ManufacturerRepository
{
    public class ManufacturerRepository : IManufacturerRepository
    {
        private readonly AppDbContext _appDbContext;

        public ManufacturerRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Manufacturer?> GetByIdAsync(string id)
        {
            return await _appDbContext.Manufacturers.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Manufacturer?> GetByNameAsync(string name)
        {
            return await _appDbContext.Manufacturers.FirstOrDefaultAsync(m => m.Name == name);
        }

        public async Task<Manufacturer?> CreateManufacturerAsync(Manufacturer manufacturer)
        {
            _appDbContext.Manufacturers.Add(manufacturer);
            await _appDbContext.SaveChangesAsync();
            return manufacturer;
        }

        public IQueryable<Manufacturer> GetAllAsync()
        {
            return _appDbContext.Manufacturers;
        }

        public async Task<Manufacturer?> UpdateManufacturerAsync(Manufacturer manufacturer)
        {
            var existingManufacturer = await _appDbContext.Manufacturers.FindAsync(manufacturer.Id);
            if (existingManufacturer == null)
            {
                return null;
            }
            
            existingManufacturer.Name = manufacturer.Name;
            existingManufacturer.Rating = manufacturer.Rating;

            await _appDbContext.SaveChangesAsync();

            return existingManufacturer;
        }

        public async Task<Manufacturer?> DeleteManufacturerAsync(string id)
        {
            var manufacturer = await _appDbContext.Manufacturers.FindAsync(id);
            if (manufacturer == null)
            {
                return null;
            }

            _appDbContext.Manufacturers.Remove(manufacturer);
            await _appDbContext.SaveChangesAsync();

            return manufacturer;
        }

        public async Task<Manufacturer> LoadClothingAsync(Manufacturer manufacturer)
        {
            await _appDbContext
                .Entry(manufacturer)
                .Collection(m => m.ClothingItems)
                .Query()
                .Include(c => c.Category)
                .LoadAsync();

            return manufacturer;
        }
    }
}
