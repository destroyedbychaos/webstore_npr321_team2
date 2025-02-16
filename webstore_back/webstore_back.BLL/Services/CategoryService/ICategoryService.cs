using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.BLL.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByNameAsync(string name);
        Task<ServiceResponse> CreateCategoryAsync(Category category);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> UpdateCategoryAsync(Category category);
        Task<ServiceResponse> DeleteCategoryAsync(string id);
    }
}
