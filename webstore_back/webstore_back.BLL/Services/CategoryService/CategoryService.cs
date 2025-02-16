using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.CategoryRepository;

namespace webstore_back.BLL.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return ServiceResponse.BadRequestResponse("Категорію не знайдено", null);
            }
            return ServiceResponse.OkResponse("Категорію отримано", category);
        }

        public async Task<ServiceResponse> GetByNameAsync(string name)
        {
            var category = await _categoryRepository.GetByNameAsync(name);
            if (category == null)
            {
                return ServiceResponse.BadRequestResponse("Категорію не знайдено", null);
            }
            return ServiceResponse.OkResponse("Категорію отримано", category);
        }

        public async Task<ServiceResponse> CreateCategoryAsync(Category category)
        {
            var createdCategory = await _categoryRepository.CreateCategoryAsync(category);
            return ServiceResponse.OkResponse("Категорію створено", createdCategory);
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var categories = await _categoryRepository.GetAllAsync().ToListAsync();
            return ServiceResponse.OkResponse("Категорії отримано", categories);
        }

        public async Task<ServiceResponse> UpdateCategoryAsync(Category category)
        {
            var updatedCategory = await _categoryRepository.UpdateCategoryAsync(category);
            if (updatedCategory == null)
            {
                return ServiceResponse.BadRequestResponse("Категорію не оновлено", null);
            }
            return ServiceResponse.OkResponse("Категорію оновлено", updatedCategory);
        }

        public async Task<ServiceResponse> DeleteCategoryAsync(string id)
        {
            var deletedCategory = await _categoryRepository.DeleteCategoryAsync(id);
            if (deletedCategory == null)
            {
                return ServiceResponse.BadRequestResponse("Категорію не видалено", null);
            }
            return ServiceResponse.OkResponse("Категорію видалено", deletedCategory);
        }
    }
}
