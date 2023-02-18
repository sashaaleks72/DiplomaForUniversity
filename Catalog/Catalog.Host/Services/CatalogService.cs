using AutoMapper;
using Catalog.Host.Data;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;

namespace Catalog.Host.Services
{
    public class CatalogService : BaseDataService<ApplicationDbContext, CatalogService>, ICatalogService
    {
        private readonly ICatalogProvider _catalogProvider;
        private readonly ILogger<CatalogService> _logger;
        private readonly IMapper _mapper;

        public CatalogService(ICatalogProvider catalogProvider, IMapper mapper, ILogger<CatalogService> logger, IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
            : base(dbContextWrapper, logger)
        {
            _catalogProvider = catalogProvider;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<TeapotResponse>> GetAllTeapotsAsync()
        {
            return await ExecuteSafeAsync(async () => {
                var recievedTeapots = await _catalogProvider.GetAllTeapotsAsync();

                if (recievedTeapots.Count == 0)
                {
                    _logger.LogError("Db is empty!");
                    throw new Exception("There are no any teapots!");
                }
                _logger.LogInformation("Teapots have been recieved");

                var teapotsResponse = _mapper.Map<List<TeapotResponse>>(recievedTeapots);

                return teapotsResponse;
            });
        }

        public async Task<List<CompanyResponse>> GetCompaniesAsync()
        {
            return await ExecuteSafeAsync(async () => {
                var recievedCompanies = await _catalogProvider.GetCompanies();

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
                var recievedTeapot = await _catalogProvider.GetTeapotByIdAsync(teapotId);

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

        public async Task<List<TeapotResponse>> GetTeapotsByCompanyNameAsync(string companyName)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var recievedTeapots = await _catalogProvider.GetTeapotsByCompanyNameAsync(companyName);

                if (recievedTeapots.Count == 0)
                {
                    string errMsg = "There are no any teapots with input company name!";

                    _logger.LogError(errMsg);
                    throw new Exception(errMsg);
                }
                _logger.LogInformation("Teapots have been recieved");

                var teapotsResponse = _mapper.Map<List<TeapotResponse>>(recievedTeapots);

                return teapotsResponse;
            });
        }
    }
}
