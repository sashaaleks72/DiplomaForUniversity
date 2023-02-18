using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;

namespace Catalog.Host.Services.Abstractions
{
    public interface ICatalogService
    {
        public Task<List<TeapotResponse>> GetAllTeapotsAsync();

        public Task<TeapotResponse?> GetTeapotByIdAsync(string teapotId);

        public Task<List<TeapotResponse>> GetTeapotsByCompanyNameAsync(string companyName);

        public Task<List<CompanyResponse>> GetCompaniesAsync();
    }
}
