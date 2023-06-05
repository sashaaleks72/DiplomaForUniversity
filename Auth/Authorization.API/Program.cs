using Data;
using Catalog.Host.Services.Abstractions;
using Catalog.Host.Services;
using Microsoft.EntityFrameworkCore;
using Authorization.API.Repositrories.Abstractions;
using Authorization.API.Repositrories;
using Authorization.API.Services.Abstractions;
using Authorization.API.Services;
using Infrastructure.Filters;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers(opt => opt.Filters.Add(typeof(HttpGlobalExceptionFilter)));
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<IDbContextWrapper<ApplicationDbContext>, DbContextWrapper<ApplicationDbContext>>();
builder.Services.AddDbContextFactory<ApplicationDbContext>(options => options.UseLazyLoadingProxies().UseSqlServer(connectionString));

builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
