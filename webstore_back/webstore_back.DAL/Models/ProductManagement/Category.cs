﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webstore_back.DAL.Models.ProductManagement
{
    public class Category
    {
        [Key]
        public required string Id { get; set; } = Guid.NewGuid().ToString();
        [MaxLength(50)]
        public required string Name { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
