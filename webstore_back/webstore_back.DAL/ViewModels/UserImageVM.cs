using Microsoft.AspNetCore.Http;

namespace Webstore.DAL.ViewModels
{
    public class UserImageVM
    {
        public string UserId { get; set; }
        public IFormFile Image { get; set; }
    }
}
