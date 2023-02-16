using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;

namespace Catalog.Host.Services.Abstractions
{
    public interface ITeapotService
    {
        public Task<List<TeapotResponse>> GetAllTeapotsAsync();

        public Task<TeapotResponse?> GetTeapotByIdAsync(string teapotId);

        public Task AddTeapotAsync(TeapotRequest newTeapot);

        public Task RemoveTeapotAsync(string teapotId);

        public Task UpdateTeapotAsync(string teapotId, TeapotRequest newTeapot);
    }
}
