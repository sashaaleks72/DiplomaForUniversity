using Catalog.Host.Data.Entities;

namespace Catalog.Host.Providers.Abstractions
{
    public interface ITeapotProvider
    {
        public Task<List<TeapotEntity>> GetAllTeapotsAsync();

        public Task<TeapotEntity?> GetTeapotByIdAsync(string teapotId);

        public Task<bool> AddTeapotAsync(TeapotEntity newTeapot);

        public Task<bool> RemoveTeapotAsync(string teapotId);

        public Task<bool> UpdateTeapotAsync(TeapotEntity newTeapot);
    }
}
