using AutoMapper;
using Catalog.Host.Data;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;

namespace Catalog.Host.Services
{
    public class CatalogService : BaseDataService<ApplicationDbContext, CatalogService>, ICatalogService
    {
        private readonly ICatalogItemProvider _catalogItemProvider;
        private readonly ICatalogCompanyProvider _catalogCompanyProvider;
        private readonly ILogger<CatalogService> _logger;
        private readonly IMapper _mapper;

        public CatalogService(ICatalogItemProvider catalogItemProvider, ICatalogCompanyProvider catalogCompanyProvider, IMapper mapper, ILogger<CatalogService> logger, IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
            : base(dbContextWrapper, logger)
        {
            _catalogCompanyProvider = catalogCompanyProvider;
            _catalogItemProvider = catalogItemProvider;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<PaginatedItemsResponse<TeapotResponse>> GetTeapotsAsync(int page, int limit)
        {
            return await ExecuteSafeAsync(async () => {
                var recievedTeapots = await _catalogItemProvider.GetTeapotsAsync(page, limit);

                if (recievedTeapots.Data.Count() == 0)
                {
                    _logger.LogError("Data list is empty!");
                    throw new Exception("There are no any teapots in the list!");
                }
                _logger.LogInformation("Teapots have been recieved");

                var teapotsResponse = _mapper.Map<List<TeapotResponse>>(recievedTeapots.Data);

                var paginatedItemsResponse = new PaginatedItemsResponse<TeapotResponse>
                {
                    Data = teapotsResponse,
                    Limit = limit,
                    Page = page,
                    TotalQuantity = recievedTeapots.TotalQuantity
                };

                return paginatedItemsResponse;
            });
        }

        public async Task<List<CompanyResponse>> GetCompaniesAsync()
        {
            return await ExecuteSafeAsync(async () => {
                var recievedCompanies = await _catalogCompanyProvider.GetCompanies();

                if (recievedCompanies.Count == 0)
                {
                    _logger.LogError("Db is empty!");
                    throw new Exception("There are no any companies!");
                }
                _logger.LogInformation("Companies have been recieved");

                var companiesResponse = _mapper.Map<List<CompanyResponse>>(recievedCompanies);

                return companiesResponse;
            });
        }

        public async Task<TeapotResponse?> GetTeapotByIdAsync(string teapotId)
        {
            return await ExecuteSafeAsync(async () => {
                var recievedTeapot = await _catalogItemProvider.GetTeapotByIdAsync(teapotId);

                if (recievedTeapot == null)
                {
                    string errMsg = "There are no a teapot with input id!";

                    _logger.LogError(errMsg);
                    throw new Exception(errMsg);
                }
                _logger.LogInformation("Teapot has been recieved");

                var teapotResponse = _mapper.Map<TeapotResponse>(recievedTeapot);

                return teapotResponse;
            });
                
        }

        public async Task<PaginatedItemsResponse<TeapotResponse>> GetTeapotsByCompanyNameAsync(string companyName, int page, int limit)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var recievedTeapots = await _catalogItemProvider.GetTeapotsByCompanyNameAsync(companyName, page, limit);

                if (recievedTeapots.Data.Count() == 0)
                {
                    string errMsg = "There are no any teapots with input parameters' values!";

                    _logger.LogError(errMsg);
                    throw new Exception(errMsg);
                }
                _logger.LogInformation("Teapots have been recieved");

                var teapotsResponse = _mapper.Map<List<TeapotResponse>>(recievedTeapots.Data);

                var paginatedItemsResponse = new PaginatedItemsResponse<TeapotResponse>
                {
                    Data = teapotsResponse,
                    Limit = limit,
                    Page = page,
                    TotalQuantity = recievedTeapots.TotalQuantity
                };

                return paginatedItemsResponse;
            });
        }
    }
}
