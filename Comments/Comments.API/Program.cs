using Catalog.Host.Services.Abstractions;
using Catalog.Host.Services;
using Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using Comments.API.Repositrories;
using Comments.API.Repositrories.Abstractions;
using Comments.API.Services;
using Comments.API.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(Program));
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

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithOrigins("http://localhost:3000");
    });
});
builder.Services.AddScoped<IDbContextWrapper<ApplicationDbContext>, DbContextWrapper<ApplicationDbContext>>();
builder.Services.AddScoped<ICommentsRepository, CommentsRepository>();
builder.Services.AddScoped<ICommentsService, CommentsService>();
builder.Services.AddDbContextFactory<ApplicationDbContext>(options => options.UseLazyLoadingProxies().UseSqlServer(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("CorsPolicy");
app.MapControllers();

app.Run();
