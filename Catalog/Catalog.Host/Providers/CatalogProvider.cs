using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Host.Providers
{
    public class CatalogProvider : ICatalogProvider
    {
        private readonly ApplicationDbContext _dbContext;

        public CatalogProvider(IDbContextWrapper<ApplicationDbContext> dbContextWrapper) 
        {
            _dbContext = dbContextWrapper.DbContext;
        }

        public async Task<List<TeapotEntity>> GetAllTeapotsAsync()
        {
            var teapots = await _dbContext.Teapots.ToListAsync();

            return teapots;
        }

        public async Task<List<CompanyEntity>> GetCompanies()
        {
            var companies = await _dbContext.Companies.ToListAsync();

            return companies;
        }

        public async Task<TeapotEntity?> GetTeapotByIdAsync(string teapotId)
        {
            var teapot = await _dbContext.Teapots.SingleOrDefaultAsync(teapot => teapot.Id == teapotId);

            return teapot;
        }

        public async Task<List<TeapotEntity>> GetTeapotsByCompanyNameAsync(string companyName)
        {
            var recievedTeapots = await _dbContext.Teapots.Where(t => t.Company.Name == companyName).ToListAsync();

            return recievedTeapots;
        }
    }
}
