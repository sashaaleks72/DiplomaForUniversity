using Catalog.Host.RequestModels;

namespace Catalog.Host.Services.Abstractions
{
    public interface ICatalogItemService
    {
        public Task AddTeapotAsync(TeapotRequest newTeapot);

        public Task RemoveTeapotAsync(string teapotId);

        public Task UpdateTeapotAsync(string teapotId, TeapotRequest newTeapot);
    }
}
