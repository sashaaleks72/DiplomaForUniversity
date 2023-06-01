using Catalog.Host.Providers.Abstractions;
using Catalog.Host.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using Data.Entities;
using Data;

namespace Catalog.Host.Providers
{
    public class CatalogItemProvider : ICatalogItemProvider
    {
        private readonly ApplicationDbContext _dbContext;

        public CatalogItemProvider(IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
        {
            _dbContext = dbContextWrapper.DbContext;
        }

        public async Task<PaginatedItems<TeapotEntity>> GetTeapotsAsync(int page, int limit)
        {
            var totalCount = await _dbContext.Teapots.CountAsync();

            var recievedTeapots = await _dbContext.Teapots
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            var paginatedItems = new PaginatedItems<TeapotEntity>
            {
                Data = recievedTeapots,
                TotalQuantity = totalCount
            };

            return paginatedItems;
        }

        public async Task<TeapotEntity?> GetTeapotByIdAsync(string teapotId)
        {
            var teapot = await _dbContext.Teapots.SingleOrDefaultAsync(teapot => teapot.Id == teapotId);

            return teapot;
        }

        public async Task<PaginatedItems<TeapotEntity>> GetTeapotsByCompanyNameAsync(string companyName, int page, int limit)
        {
            var totalCount = await _dbContext.Teapots.Where(t => t.Company.Name == companyName).CountAsync();

            var recievedTeapots = await _dbContext.Teapots
                .Where(t => t.Company.Name == companyName)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            var paginatedItems = new PaginatedItems<TeapotEntity>
            {
                Data = recievedTeapots,
                TotalQuantity = totalCount
            };

            return paginatedItems;
        }

        public async Task<bool> AddTeapotAsync(TeapotEntity newTeapot)
        {
            await _dbContext.AddAsync(newTeapot);
            int quantityOfAddedEntries = await _dbContext.SaveChangesAsync();

            return quantityOfAddedEntries > 0;
        }

        public async Task<bool> UpdateTeapotAsync(TeapotEntity changedTeapot)
        {
            _dbContext.Update(changedTeapot);
            int quantityOfUpdatedEntries = await _dbContext.SaveChangesAsync();

            return quantityOfUpdatedEntries > 0;
        }

        public async Task<bool> RemoveTeapotAsync(string teapotId)
        {
            int quantityOfRemovedEntries = await _dbContext.Database.ExecuteSqlRawAsync($"DELETE FROM public.\"Teapots\" WHERE \"Id\" = '{teapotId}';");
            return quantityOfRemovedEntries > 0;
        }
    }
}
