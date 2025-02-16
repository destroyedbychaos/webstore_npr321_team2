using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using webstore_back.DAL.ViewModels;
using webstore_back.DAL;

namespace webstore_back.BLL.Validators
{
    public class SignInValidator : AbstractValidator<SignInVM>
    {
        public SignInValidator()
        {
            RuleFor(m => m.Email)
                .EmailAddress().WithMessage("Невірний формат пошти")
                .NotEmpty().WithMessage("Вкажіть пошту");
            RuleFor(m => m.Password)
                .MinimumLength(Settings.PasswordLength).WithMessage("Мінімальна довжина паролю 6 символів");
        }
    }
}
