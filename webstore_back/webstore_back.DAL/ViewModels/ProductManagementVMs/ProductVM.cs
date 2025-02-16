﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webstore_back.DAL.ViewModels.ProductManagementVMs
{
    public class ProductVM
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string StockQuantity { get; set; }
        public string Category { get; set; }
        public string Manufacturer { get; set; }
    }
}
