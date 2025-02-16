using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webstore_back.DAL.Models.ProductManagement
{
    public class Manufacturer
    {
        [Key]
        public required string Id { get; set; } = Guid.NewGuid().ToString();
        [MaxLength(50)]
        public required string Name { get; set; }
        [Range(0, 10)]
        public int Rating { get; set; }
        public ICollection<Product> Products { get; set; } = [];
    }
}
