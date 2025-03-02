using System.ComponentModel.DataAnnotations;

namespace webstore_back.DAL.Models.ProductManagement
{
    public class Manufacturer
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [MaxLength(50)]
        public required string Name { get; set; }
        [Range(0, 10)]
        public int Rating { get; set; } = 0;
        public ICollection<ClothingItem> ClothingItems { get; set; } = [];
    }
}
