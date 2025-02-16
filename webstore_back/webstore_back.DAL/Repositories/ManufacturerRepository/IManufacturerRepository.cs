using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Repositories.ManufacturerRepository
{
    public interface IManufacturerRepository
    {
        Task<Manufacturer?> GetByIdAsync (string id);
        Task<Manufacturer?> GetByNameAsync (string name);
        Task<Manufacturer?> CreateManufacturerAsync (Manufacturer manufacturer);
        IQueryable<Manufacturer> GetAllAsync();
        Task<Manufacturer?> UpdateManufacturerAsync (Manufacturer manufacturer);
        Task<Manufacturer?> DeleteManufacturerAsync (string id);
    }
}
