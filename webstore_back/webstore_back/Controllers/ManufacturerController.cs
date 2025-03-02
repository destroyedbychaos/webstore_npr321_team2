using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services.ManufacturerService;

namespace webstore_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManufacturerController : BaseController
    {
        private readonly IManufacturerService _manufacturerService;

        public ManufacturerController(IManufacturerService manufacturerService)
        {
            _manufacturerService = manufacturerService;
        }

        [HttpGet("manufacturers")]
        public async Task<IActionResult> GetManufacturersAsync()
        {
            var response = await _manufacturerService.GetAllAsync();
            return GetResult(response);
        }
    }
}
