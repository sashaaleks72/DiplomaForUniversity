using Catalog.Host.Providers;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.Services;
using Catalog.Host.Services.Abstractions;
using Data;
using Infrastructure.Filters;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers(opt => opt.Filters.Add(typeof(HttpGlobalExceptionFilter)));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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

app.UseAuthorization();

app.MapControllers();

app.Run();
