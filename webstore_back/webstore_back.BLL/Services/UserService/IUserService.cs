using MimeKit.Tnef;
using webstore_back.BLL.Services;
using webstore_back.DAL.ViewModels;


namespace Dashboard.BLL.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByEmailAsync(string email);
        Task<ServiceResponse> GetByUserNameAsync(string userName);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> GetAllAsync(int page, int pageSize);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> CreateAsync(CreateUpdateUserVM model);
        Task<ServiceResponse> UpdateAsync(CreateUpdateUserVM model);
        Task<ServiceResponse> AddImageFromUserAsync(UserImageVM model);
        Task<ServiceResponse> GetUsersByRoleAsync(string role);
    }
}
