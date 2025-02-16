using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.ManufacturerRepository;

namespace webstore_back.BLL.Services.ManufacturerService
{
    public class ManufacturerService : IManufacturerService
    {
        private readonly IManufacturerRepository _manufacturerRepository;

        public ManufacturerService(IManufacturerRepository manufacturerRepository)
        {
            _manufacturerRepository = manufacturerRepository;
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var manufacturer = await _manufacturerRepository.GetByIdAsync(id);
            if (manufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Виробника не знайдено", null);
            }
            return ServiceResponse.OkResponse("Виробника знайдено", manufacturer);
        }

        public async Task<ServiceResponse> GetByNameAsync(string name)
        {
            var manufacturer = await _manufacturerRepository.GetByNameAsync(name);
            if (manufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Виробника не знайдено", null);
            }
            return ServiceResponse.OkResponse("Виробника знайдено", manufacturer);
        }

        public async Task<ServiceResponse> CreateManufacturerAsync(Manufacturer manufacturer)
        {
            var createdManufacturer = await _manufacturerRepository.CreateManufacturerAsync(manufacturer);
            return ServiceResponse.OkResponse("Виробника створено", createdManufacturer);
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var manufacturers = await _manufacturerRepository.GetAllAsync().ToListAsync();
            return ServiceResponse.OkResponse("Виробники отримані", manufacturers);
        }

        public async Task<ServiceResponse> UpdateManufacturerAsync(Manufacturer manufacturer)
        {
            var updatedManufacturer = await _manufacturerRepository.UpdateManufacturerAsync(manufacturer);
            if (updatedManufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Не вдалося оновити виробника", null);
            }
            return ServiceResponse.OkResponse("Виробника оновлено", updatedManufacturer);
        }

        public async Task<ServiceResponse> DeleteManufacturerAsync(string id)
        {
            var deletedManufacturer = await _manufacturerRepository.DeleteManufacturerAsync(id);
            if (deletedManufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Не вдалося видалити виробника", null);
            }
            return ServiceResponse.OkResponse("Виробника видалено", deletedManufacturer);
        }
    }
}
