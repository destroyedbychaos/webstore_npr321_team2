using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;

namespace webstore_back.DAL.Models.Identity
{
    public class UserClaim : IdentityUserClaim<string>
    {
        public virtual User User { get; set; }
    }
}
