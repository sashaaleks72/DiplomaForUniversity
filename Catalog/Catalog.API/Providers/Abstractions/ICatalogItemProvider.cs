using Data;
using Data.Entities;

namespace Catalog.Host.Providers.Abstractions
{
    public interface ICatalogItemProvider
    {
        public Task<bool> AddTeapotAsync(TeapotEntity newTeapot);

        public Task<bool> RemoveTeapotAsync(string teapotId);

        public Task<bool> UpdateTeapotAsync(TeapotEntity newTeapot);

        public Task<PaginatedItems<TeapotEntity>> GetTeapotsAsync(string sort, string order, int page, int limit);

        public Task<TeapotEntity?> GetTeapotByIdAsync(string teapotId);

        public Task<PaginatedItems<TeapotEntity>> GetTeapotsByCompanyNameAsync(string companyName, int page, int limit);
    }
}
