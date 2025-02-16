using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.BLL.Services.ManufacturerService
{
    public interface IManufacturerService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByNameAsync(string name);
        Task<ServiceResponse> CreateManufacturerAsync(Manufacturer manufacturer);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> UpdateManufacturerAsync(Manufacturer manufacturer);
        Task<ServiceResponse> DeleteManufacturerAsync(string id);
    }
}
