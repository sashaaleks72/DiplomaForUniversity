using Catalog.Host.Data.Entities;

namespace Catalog.Host.Providers.Abstractions
{
    public interface ICatalogItemProvider
    {
        public Task<bool> AddTeapotAsync(TeapotEntity newTeapot);

        public Task<bool> RemoveTeapotAsync(string teapotId);

        public Task<bool> UpdateTeapotAsync(TeapotEntity newTeapot);
    }
}
