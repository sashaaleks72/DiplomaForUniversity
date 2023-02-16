using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Host.Providers
{
    public class TeapotProvider : ITeapotProvider
    {
        private readonly IDbContextWrapper<ApplicationDbContext> _dbContextWrapper;

        public TeapotProvider(IDbContextWrapper<ApplicationDbContext> dbContextWrapper) 
        {
            _dbContextWrapper = dbContextWrapper;
        }

        public async Task<List<TeapotEntity>> GetAllTeapotsAsync()
        {
            var teapots = await _dbContextWrapper.DbContext.Teapots.ToListAsync();

            return teapots;
        }

        public async Task<TeapotEntity?> GetTeapotByIdAsync(string teapotId)
        {
            var teapot = await _dbContextWrapper.DbContext.Teapots.SingleOrDefaultAsync(teapot => teapot.Id == teapotId);

            return teapot;
        }

        public async Task<bool> AddTeapotAsync(TeapotEntity newTeapot)
        {
            await _dbContextWrapper.DbContext.AddAsync(newTeapot);
            int quantityOfAddedEntries = await _dbContextWrapper.DbContext.SaveChangesAsync();

            return quantityOfAddedEntries > 0;
        }

        public async Task<bool> UpdateTeapotAsync(TeapotEntity newTeapot)
        {
            _dbContextWrapper.DbContext.Update(newTeapot);
            int quantityOfUpdatedEntries = await _dbContextWrapper.DbContext.SaveChangesAsync();

            return quantityOfUpdatedEntries > 0;
        }

        public async Task<bool> RemoveTeapotAsync(string teapotId)
        {
            int quantityOfRemovedEntries = await _dbContextWrapper.DbContext.Database.ExecuteSqlRawAsync($"DELETE FROM public.\"Teapots\" WHERE \"Id\" = '{teapotId}';");
            return quantityOfRemovedEntries > 0;
        }
    }
}
