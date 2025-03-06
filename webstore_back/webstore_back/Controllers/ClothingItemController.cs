using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services;
using webstore_back.BLL.Services.CategoryService;
using webstore_back.BLL.Validators;
using webstore_back.DAL.Repositories.ProductRepository;
using webstore_back.DAL.ViewModels.ProductManagementVMs;

namespace webstore_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClothingItemController : BaseController
    {
        private readonly IClothingItemService _clothingItemService;
        public ClothingItemController(IClothingItemService clothingItemService)
        {
            _clothingItemService = clothingItemService;
        }
        
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllAsync()
        {
            var response = await _clothingItemService.GetAllAsync();
            return GetResult(response);
        }
        
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetByIdAsync(string id)
        {
            if (string.IsNullOrEmpty(id)) {
                return BadRequest(ServiceResponse.BadRequestResponse("Id товару не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByIdAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));

        }
        
        [HttpGet("getbyname")]
        public async Task<IActionResult> GetByNameAsync(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Ім'я товару не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByNameAsync(name);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));

        }
        
        [HttpGet("getbymanufacturerid")]
        public async Task<IActionResult> GetByManufacturerIdAsync(string manufacturerId)
        {
            if (string.IsNullOrEmpty(manufacturerId))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id виробника не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByManufacturerIdAsync(manufacturerId);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));
        }
        
        [HttpGet("getbymanufacturername")]
        public async Task<IActionResult> GetByManufacturerNameAsync(string manufacturerName)
        {
            if (string.IsNullOrEmpty(manufacturerName))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Ім'я виробника не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByManufacturerNameAsync(manufacturerName);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));
        }
        
        [HttpGet("getbycategoryid")]
        public async Task<IActionResult> GetByCategoryIdAsync(string categoryId)
        {
            if (string.IsNullOrEmpty(categoryId))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id категорії не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByCategoryIdAsync(categoryId);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));
        }
        
        [HttpGet("getbycategoryname")]
        public async Task<IActionResult> GetByCategoryNameAsync(string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Ім'я категорії не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByCategoryNameAsync(categoryName);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));
        }
        
        [HttpPost("create")]
        public async Task<IActionResult> CreateClothingItemASync(ClothingItemVM model)
        {
            var validator = new ClothingItemVMValidator();
            var validateResult = await validator.ValidateAsync(model);
            if(!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }
            var response = await _clothingItemService.CreateProductAsync(model);
            return GetResult(response);
        }
        
        [HttpPost("update")]
        public async Task<IActionResult> UpdateClothingItemAsync(ClothingItemVM model)
        {
            var validator = new ClothingItemVMValidator();
            var validateResult = await validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }
            var response = await _clothingItemService.UpdateProductAsync(model);
            return GetResult(response);
        }
        
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteProductAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id товару не може бути порожнім"));
            }
            var response = await _clothingItemService.DeleteProductAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не видалено."));
        }
    }
}
