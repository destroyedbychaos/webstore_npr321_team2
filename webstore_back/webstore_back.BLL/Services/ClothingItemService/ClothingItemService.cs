using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.CategoryRepository;
using webstore_back.DAL.Repositories.ManufacturerRepository;
using webstore_back.DAL.Repositories.ProductRepository;
using webstore_back.DAL.ViewModels.ProductManagementVMs;

namespace webstore_back.BLL.Services.CategoryService
{
    public class ClothingItemService : IClothingItemService
    {
        private readonly IClothingItemRepository _productRepository;
        private readonly IManufacturerRepository _manufacturerRepository;
        private readonly ICategoryRepository _categoryRepository;
        public ClothingItemService(IClothingItemRepository productRepository, IManufacturerRepository manufacturerRepository, ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            _manufacturerRepository = manufacturerRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }
            return ServiceResponse.OkResponse("Товар отримано.", product);
        }

        public async Task<ServiceResponse> GetByNameAsync(string name)
        {
            var products = await _productRepository.GetByNameAsync(name);
            if (products == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }
            return ServiceResponse.OkResponse("Товар отримано.", products);
        }

        public async Task<ServiceResponse> GetByManufacturerIdAsync(string manufacturerId)
        {
            var products = await _productRepository.GetByManufacturerIdAsync(manufacturerId);
            if (products == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }
            return ServiceResponse.OkResponse("Товар отримано.", products);
        }

        public async Task<ServiceResponse> GetByManufacturerNameAsync(string manufacturerName)
        {
            var products = await _productRepository.GetByManufacturerNameAsync(manufacturerName);
            if (products == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }
            return ServiceResponse.OkResponse("Товар отримано.", products);
        }

        public async Task<ServiceResponse> CreateProductAsync(ClothingItemVM model)
        {
            var manufacturer = await _manufacturerRepository.GetByNameAsync(model.Manufacturer);
            var category = await _categoryRepository.GetByNameAsync(model.Category);

            if (category != null && manufacturer != null)
            {
                var product = new ClothingItem
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = model.Name,
                    Price = model.Price,
                    ManufacturerId = manufacturer.Id,
                    CategoryId = category.Id
                };
                var createdProduct = await _productRepository.CreateProductAsync(product);

                return ServiceResponse.OkResponse("Товар створено", createdProduct);
            }
            return ServiceResponse.BadRequestResponse("Товар не створено");
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync().ToListAsync();
            return ServiceResponse.OkResponse("Товар отримано", products);
        }

        public async Task<ServiceResponse> UpdateProductAsync(ClothingItemVM model)
        {
            var product = await _productRepository.GetByIdAsync(model.Id.ToString());
            if (product == null)
            {
                return ServiceResponse.BadRequestResponse("Товару не знайдено");
            }

            product.Name = model.Name;
            product.Price = model.Price;
            var manufacturer = await _manufacturerRepository.GetByNameAsync(model.Manufacturer);
            if (manufacturer != null)
            {
                product.ManufacturerId = manufacturer.Id;
            }
            var category = await _categoryRepository.GetByNameAsync(model.Category);
            if (category != null)
            {
                product.CategoryId = category.Id;
            }
            var updatedProduct = await _productRepository.UpdateProductAsync(product);

            return ServiceResponse.OkResponse("Інформацію про товар оновлено");
        }

        public async Task<ServiceResponse> DeleteProductAsync(string id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return ServiceResponse.BadRequestResponse("Не знайдено товару");
            }

            var deletedProduct = await _productRepository.DeleteProductAsync(id);
            return ServiceResponse.OkResponse("Товар видалено");
        }

        public async Task<ServiceResponse> GetByCategoryNameAsync(string categoryName)
        {
            var products = await _productRepository.GetByCategoryNameAsync(categoryName);
            if (products != null)
            {
                return ServiceResponse.OkResponse("Отримано товар за ім'ям категорії", products);
            }
            return ServiceResponse.BadRequestResponse("Не отримано товару");
        }

        public async Task<ServiceResponse> GetByCategoryIdAsync(string categoryId)
        {
            var products = await _productRepository.GetByCategoryIdAsync(categoryId);
            if (products != null)
            {
                return ServiceResponse.OkResponse("Отримано товар за ID категорії", products);
            }
            return ServiceResponse.BadRequestResponse("Не отримано товару");
        }
    }
}
