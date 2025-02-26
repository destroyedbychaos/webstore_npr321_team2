using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels.ProductManagementVMs;

namespace webstore_back.BLL.Services.ManufacturerService
{
    public interface IManufacturerService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByNameAsync(string name);
        Task<ServiceResponse> CreateManufacturerAsync(ManufacturerVM model);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> UpdateManufacturerAsync(ManufacturerVM model);
        Task<ServiceResponse> DeleteManufacturerAsync(string id);
    }
}
