﻿using Microsoft.AspNetCore.Identity;

namespace webstore_back.DAL.Models.Identity
{
    public class Role : IdentityRole<string>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; } = [];
        public virtual ICollection<RoleClaim> RoleClaims { get; set; } = [];
    }
}
