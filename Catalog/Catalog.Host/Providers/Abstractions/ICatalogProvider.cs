using Catalog.Host.Data.Entities;
using Catalog.Host.ResponseModels;

namespace Catalog.Host.Providers.Abstractions
{
    public interface ICatalogProvider
    {
        public Task<List<TeapotEntity>> GetAllTeapotsAsync();

        public Task<TeapotEntity?> GetTeapotByIdAsync(string teapotId);

        public Task<List<TeapotEntity>> GetTeapotsByCompanyNameAsync(string companyName);

        public Task<List<CompanyEntity>> GetCompanies();
    }
}
