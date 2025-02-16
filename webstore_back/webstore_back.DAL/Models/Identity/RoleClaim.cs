﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace webstore_back.DAL.Models.Identity
{
    public class RoleClaim : IdentityRoleClaim<string>
    {
        public virtual Role? Role { get; set; }
    }
}
