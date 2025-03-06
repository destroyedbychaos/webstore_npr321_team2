using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Data;
using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Repositories.CategoryRepository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _appDbContext;

        public CategoryRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Category?> GetByIdAsync(string id)
        {
            return await _appDbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _appDbContext.Categories.FirstOrDefaultAsync(c => c.Name == name);
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            _appDbContext.Categories.Add(category);
            await _appDbContext.SaveChangesAsync();
            return category;
        }

        public IQueryable<Category> GetAllAsync()
        {
            return _appDbContext.Categories;
        }

        public async Task<Category?> UpdateCategoryAsync(Category category)
        {
            var existingCategory = await _appDbContext.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.Id == category.Id);
            if (existingCategory == null)
            {
                return null;
            }

            _appDbContext.Update(existingCategory);
            await _appDbContext.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> DeleteCategoryAsync(string id)
        {
            var category = await _appDbContext.Categories.FindAsync(id);
            if (category == null)
            {
                return null;
            }

            _appDbContext.Categories.Remove(category);
            await _appDbContext.SaveChangesAsync();

            return category;
        }
    }
}