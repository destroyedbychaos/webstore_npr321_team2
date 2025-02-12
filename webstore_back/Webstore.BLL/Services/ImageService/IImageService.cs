﻿using Microsoft.AspNetCore.Http;

namespace Webstore.BLL.Services.ImageService
{
    public interface IImageService
    {
        Task<ServiceResponse> SaveImageFromBase64Async(string path, string base64);
        Task<ServiceResponse> SaveImageFromFileAsync(string path, IFormFile image);
    }
}
