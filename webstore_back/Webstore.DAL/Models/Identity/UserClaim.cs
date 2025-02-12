﻿using Microsoft.AspNetCore.Identity;

namespace Webstore.DAL.Models.Identity
{
    public class UserClaim : IdentityUserClaim<string>
    {
        public virtual User User { get; set; }
    }
}
