using Catalog.Host.Data.Entities;
using Catalog.Host.RequestModels;

namespace Catalog.Host.Services.Abstractions
{
    public interface ICatalogCompanyService
    {
        public Task AddCompanyAsync(CompanyRequest newCompany);

        public Task UpdateCompanyAsync(int companyId, CompanyRequest changedCompany);

        public Task DeleteCompanyByIdAsync(int companyId);
    } 
}
