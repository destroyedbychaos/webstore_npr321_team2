namespace webstore_back.DAL.ViewModels.ProductManagementVMs
{
    public class ClothingItemVM
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int StockQuantity { get; set; }
        public string Category { get; set; }
        public string Manufacturer { get; set; }
    }
}
