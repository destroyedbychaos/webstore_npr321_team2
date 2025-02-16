using Webstore.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace Webstore.API.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult GetResult(ServiceResponse serviseResponse)
        {
            return StatusCode((int)serviseResponse.StatusCode, serviseResponse);  
        }
    }
}
