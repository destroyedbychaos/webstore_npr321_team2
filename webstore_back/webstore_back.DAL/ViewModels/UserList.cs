using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webstore_back.DAL.Models.Identity;

namespace webstore_back.DAL.ViewModels
{
    public class UserListVM
    {
        public int Page { get; set; }
        public int PageCount { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<UserVM> Users { get; set; } = [];
    }
}
