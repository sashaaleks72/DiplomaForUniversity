using AutoMapper;
using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.RequestModels;
using Catalog.Host.Services.Abstractions;
using Infrastructure.Exceptions;

namespace Catalog.Host.Services
{
    public class CatalogCompanyService : BaseDataService<ApplicationDbContext, CatalogCompanyService>, ICatalogCompanyService
    {
        private readonly ICatalogCompanyProvider _catalogCompanyProvider;
        private readonly ILogger<CatalogCompanyService> _logger;
        private readonly IMapper _mapper;

        public CatalogCompanyService(ICatalogCompanyProvider catalogCompanyProvider, IMapper mapper, 
            ILogger<CatalogCompanyService> logger, IDbContextWrapper<ApplicationDbContext> dbContextWrapper) 
            : base(dbContextWrapper, logger)
        {
            _logger = logger;
            _catalogCompanyProvider = catalogCompanyProvider;
            _mapper = mapper;
        }

        public async Task AddCompanyAsync(CompanyRequest newCompany)
        {
            await ExecuteSafeAsync(async () =>
            {
                var companyEntity = _mapper.Map<CompanyEntity>(newCompany);
                bool isAdded = await _catalogCompanyProvider.AddCompanyAsync(companyEntity);

                if (!isAdded)
                {
                    string errMsg = "Company hasn't been added by some reason!";
                    _logger.LogError(errMsg);

                    throw new BusinessException(errMsg);
                }

                _logger.LogInformation("Company has been added!");
            });
        }

        public async Task DeleteCompanyByIdAsync(int companyId)
        {
            await ExecuteSafeAsync(async () =>
            {
                var companyToDelete = new CompanyEntity { Id = companyId };
                bool isRemoved = await _catalogCompanyProvider.DeleteCompanyByIdAsync(companyToDelete);

                if (!isRemoved)
                {
                    string errMsg = "Company hasn't been removed by some reason!";
                    _logger.LogError(errMsg);

                    throw new BusinessException(errMsg);
                }

                _logger.LogInformation("Company has been removed!");
            });
        }

        public async Task UpdateCompanyAsync(int companyId, CompanyRequest changedCompany)
        {
            await ExecuteSafeAsync(async () =>
            {
                var companyEntity = _mapper.Map<CompanyEntity>(changedCompany);
                companyEntity.Id = companyId;

                bool isUpdated = await _catalogCompanyProvider.UpdateCompanyAsync(companyEntity);

                if (!isUpdated)
                {
                    string errMsg = "Company hasn't been updated by some reason!";
                    _logger.LogError(errMsg);

                    throw new BusinessException(errMsg);
                }

                _logger.LogInformation("Company has been updated!");
            });
        }
    }
}
