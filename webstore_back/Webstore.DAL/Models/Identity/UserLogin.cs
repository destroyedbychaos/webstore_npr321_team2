using Microsoft.AspNetCore.Identity;

namespace Webstore.DAL.Models.Identity
{
    public class UserLogin : IdentityUserLogin<string>
    {
        public virtual User User { get; set; }
    }
}
