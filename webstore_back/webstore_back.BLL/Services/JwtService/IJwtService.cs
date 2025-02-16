using Webstore.DAL.Models.Identity;
using Webstore.DAL.ViewModels;

namespace Webstore.BLL.Services.JwtService
{
    public interface IJwtService
    {
        Task<ServiceResponse> GenerateTokensAsync(User user);
        Task<ServiceResponse> RefreshTokensAsync(JwtVM model);
    }
}
