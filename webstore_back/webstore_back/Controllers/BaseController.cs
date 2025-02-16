using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services;

namespace webstore_back.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult GetResult(ServiceResponse serviceResponse)
        {
            return StatusCode((int)serviceResponse.StatusCode, serviceResponse);
        }
    }
}
