using Microsoft.AspNetCore.Http;
using webstore_back.BLL.Services;

namespace webstore_back.BLL.Services.ImageService
{
    public interface IImageService
    {
        Task<ServiceResponse> SaveImageFromBase64Async(string path, string base64);
        Task<ServiceResponse> SaveImageFromFileAsync(string path, IFormFile image);
    }
}
