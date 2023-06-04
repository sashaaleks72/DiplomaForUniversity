using Catalog.Host.Providers;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.Services;
using Catalog.Host.Services.Abstractions;
using Data;
using Infrastructure.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers(opt => opt.Filters.Add(typeof(HttpGlobalExceptionFilter)));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opts =>
    {
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AuthorizationConfigs:SecretKey").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddSwaggerGen(opts =>
{
    opts.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Some description",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    opts.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddTransient<ICatalogService, CatalogService>();

builder.Services.AddTransient<ICatalogItemProvider, CatalogItemProvider>();
builder.Services.AddTransient<ICatalogItemService, CatalogItemService>();

builder.Services.AddTransient<ICatalogCompanyProvider, CatalogCompanyProvider>();
builder.Services.AddTransient<ICatalogCompanyService, CatalogCompanyService>();

builder.Services.AddScoped<IDbContextWrapper<ApplicationDbContext>, DbContextWrapper<ApplicationDbContext>>();

builder.Services.AddDbContextFactory<ApplicationDbContext>(options => options.UseLazyLoadingProxies().UseSqlServer(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
