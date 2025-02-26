using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services;
using webstore_back.BLL.Services.CategoryService;
using webstore_back.BLL.Validators;
using webstore_back.DAL.Repositories.CategoryRepository;
using webstore_back.DAL.ViewModels.ProductManagementVMs;

namespace webstore_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllAsync()
        {
            var response = await _categoryService.GetAllAsync();
            return GetResult(response);
        }
        [HttpGet("getbyid")]
        public async Task<IActionResult> GetByIdAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id категорії не може бути порожнім"));
            }
            var response = await _categoryService.GetByIdAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Категорію не знайдено."));
        }
        [HttpGet("getbyname")]
        public async Task<IActionResult> GetByNameAsync(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Ім'я категорії не може бути порожнім"));
            }
            var response = await _categoryService.GetByNameAsync(name);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Категорію не знайдено."));
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateCategoryAsync(CategoryVM model)
        {
            var validator = new CategoryVMValidator();
            var validateResult = await validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }
            var response = await _categoryService.CreateCategoryAsync(model);
            return GetResult(response);
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateCategoryAsync(CategoryVM model)
        {
            var validator = new CategoryVMValidator();
            var validateResult = await validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }
            var response = await _categoryService.UpdateCategoryAsync(model);
            return GetResult(response);
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteCategoryAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id категорії не може бути порожнім"));
            }
            var response = await _categoryService.DeleteCategoryAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Категорію не видалено."));
        }
    }
}
