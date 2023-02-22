using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Catalog.Host.Providers.Abstractions
{
    public interface ICatalogItemProvider
    {
        public Task<bool> AddTeapotAsync(TeapotEntity newTeapot);

        public Task<bool> RemoveTeapotAsync(string teapotId);

        public Task<bool> UpdateTeapotAsync(TeapotEntity newTeapot);

        public Task<PaginatedItems<TeapotEntity>> GetTeapotsAsync(int page, int limit);

        public Task<TeapotEntity?> GetTeapotByIdAsync(string teapotId);

        public Task<PaginatedItems<TeapotEntity>> GetTeapotsByCompanyNameAsync(string companyName, int page, int limit);
    }
}
