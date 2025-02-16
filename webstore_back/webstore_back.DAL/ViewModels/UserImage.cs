using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace webstore_back.DAL.ViewModels
{
    public class UserImageVM
    {
        public string UserId { get; set; }
        public IFormFile Image { get; set; }
    }
}
