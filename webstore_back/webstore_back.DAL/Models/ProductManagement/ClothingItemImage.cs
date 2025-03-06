using System.ComponentModel.DataAnnotations.Schema;

namespace webstore_back.DAL.Models.ProductManagement;

public class ClothingItemImage
{
    public string Id { get; set; }
    
    [ForeignKey("ClothingItem")]
    public string ClothingItemId { get; set; }
    public ClothingItem ClothingItem { get; set; }
    
    public string FilePath { get; private set; }
}