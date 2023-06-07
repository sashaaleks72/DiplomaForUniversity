using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;

namespace Catalog.Host.Services.Abstractions
{
    public interface ICatalogService
    {
        public Task<PaginatedItemsResponse<TeapotResponse>> GetTeapotsAsync(string sort, string order, int page, int limit);

        public Task<TeapotResponse?> GetTeapotByIdAsync(string teapotId);

        public Task<PaginatedItemsResponse<TeapotResponse>> GetTeapotsByCompanyNameAsync(string companyName, int page, int limit);

        public Task<List<CompanyResponse>> GetCompaniesAsync();
    }
}
