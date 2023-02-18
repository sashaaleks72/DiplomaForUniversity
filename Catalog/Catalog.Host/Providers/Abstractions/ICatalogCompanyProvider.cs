using Catalog.Host.Data.Entities;

namespace Catalog.Host.Providers.Abstractions
{
    public interface ICatalogCompanyProvider
    {
        public Task<bool> AddCompanyAsync(CompanyEntity companyEntity);

        public Task<bool> UpdateCompanyAsync(CompanyEntity changedCompany);

        public Task<bool> DeleteCompanyByIdAsync(CompanyEntity companyToDelete);
    }
}
