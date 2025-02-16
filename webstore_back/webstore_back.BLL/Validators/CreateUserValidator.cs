﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using webstore_back.DAL;
using webstore_back.DAL.ViewModels;


namespace webstore_back.BLL.Validators
{
    public class CreateUserValidator : AbstractValidator<CreateUpdateUserVM>
    {
        public CreateUserValidator()
        {
            RuleFor(m => m.Email)
                .EmailAddress().WithMessage("Невірний формат пошти")
                .NotEmpty().WithMessage("Вкажіть пошту");
            RuleFor(m => m.UserName)
                .NotEmpty().WithMessage("Вкажіть ім'я користувача");
            RuleFor(m => m.Password)
                .MinimumLength(Settings.PasswordLength).WithMessage("Мінімальна довжина паролю 6 символів");
            RuleFor(m => m.Role)
                .NotEmpty().WithMessage("Вкажіть роль");
        }
    }
}
