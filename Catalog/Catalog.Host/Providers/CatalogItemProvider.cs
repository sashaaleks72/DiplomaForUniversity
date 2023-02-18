using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Host.Providers
{
    public class CatalogItemProvider : ICatalogItemProvider
    {
        private readonly ApplicationDbContext _dbContext;

        public CatalogItemProvider(IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
        {
            _dbContext = dbContextWrapper.DbContext;
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
