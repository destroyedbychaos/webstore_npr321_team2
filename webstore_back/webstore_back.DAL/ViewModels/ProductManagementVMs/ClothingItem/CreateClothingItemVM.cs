﻿using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.ViewModels.ProductManagementVMs
{
    public class CreateClothingItemVM
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int StockQuantity { get; set; }
        public string CategoryId { get; set; }
        public string ManufacturerId { get; set; }
        
        public List<ClothingItemImage> Images { get; private set; } = [];
    }
}
