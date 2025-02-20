using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webstore_back.DAL.Models.Identity;

namespace webstore_back.DAL.Models.ProductManagement
{
    public class OrderItem
    {
        [Key]
        public required string Id { get; set; } = Guid.NewGuid().ToString();
        public required int Quantity { get; set; }
        public required bool isPaidFor { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Product")]
        public string ClothingItemId { get; set; }
        public ClothingItem ClothingItem { get; set; }

        [ForeignKey("Order")]
        public string OrderId { get; set; }
        public Order Order { get; set; }

    }
}
