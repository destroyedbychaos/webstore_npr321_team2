using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webstore_back.DAL.ViewModels.ProductManagementVMs;

namespace webstore_back.BLL.Services.ProductService
{
    public interface IProductService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByNameAsync(string name);
        Task<ServiceResponse> GetByManufacturerIdAsync(string manufacturerId);
        Task<ServiceResponse> GetByManufacturerNameAsync(string manufacturerName);
        Task<ServiceResponse> CreateProductAsync(ClothingItemVM model);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> UpdateProductAsync(ClothingItemVM model);
        Task<ServiceResponse> DeleteProductAsync(string id);
        Task<ServiceResponse> GetByCategoryNameAsync(string categoryName);
        Task<ServiceResponse> GetByCategoryIdAsync(string categoryId);
    }

}
