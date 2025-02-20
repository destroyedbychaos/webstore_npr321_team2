using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using webstore_back.DAL.ViewModels.ProductManagementVMs;

namespace webstore_back.BLL.Validators
{
    public class CategoryVMValidator : AbstractValidator<CategoryVM>
    {
        public CategoryVMValidator() 
        {
            RuleFor(x => x.Name)
                .MaximumLength(50).WithMessage("Максимальна довжина назви 50 символів.")
                .NotEmpty().WithMessage("Вкажіть назву.");
        }
    }
}
