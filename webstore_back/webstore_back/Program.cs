using Webstore.BLL.Middlewares;
using Webstore.BLL.Services.AccountService;
using Webstore.BLL.Services.ImageService;
using Webstore.BLL.Services.JwtService;
using Webstore.BLL.Services.MailService;
using Webstore.BLL.Services.RoleService;
using Webstore.BLL.Services.UserService;
using Webstore.DAL;
using Webstore.DAL.Data;
using Webstore.DAL.Data.Initializer;
using Webstore.DAL.Models.Identity;
using Webstore.DAL.Repositories.RoleRepository;
using Webstore.DAL.Repositories.UserRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add database context
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql("name=Default");
    // options.UseNpgsql("name=PostgreSqlUbuntu");
});

// Add CORS
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

    optinons.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT token"
    });

    optinons.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            //new []{ Settings.AdminRole, Settings.UserRole }
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(myAllowSpecificOrigins);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.WebRootPath, "templates")),
    RequestPath = "/files"
});

if(!File.Exists(Path.Combine(builder.Environment.WebRootPath, "images")))
{
    Directory.CreateDirectory(Path.Combine(builder.Environment.WebRootPath, "images"));
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.WebRootPath, "images")),
    RequestPath = "/images"
});

app.MapControllers();

app.Run();
