using AutoMapper;
using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.RequestModels;
using Catalog.Host.Services.Abstractions;
using Infrastructure.Exceptions;

namespace Catalog.Host.Services
{
    public class CatalogItemService : BaseDataService<ApplicationDbContext, CatalogItemService>, ICatalogItemService
    {
        private readonly ICatalogItemProvider _catalogItemProvider;
        private readonly ILogger<ICatalogItemService> _logger;
        private readonly IMapper _mapper;

        public CatalogItemService(ICatalogItemProvider catalogItemProvider, IMapper mapper, ILogger<CatalogItemService> logger, IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
            : base(dbContextWrapper, logger)
        {
            _catalogItemProvider = catalogItemProvider;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task AddTeapotAsync(TeapotRequest newTeapot)
        {
            await ExecuteSafeAsync(async () => {
                var teapotEntity = _mapper.Map<TeapotEntity>(newTeapot);

                bool isAdded = await _catalogItemProvider.AddTeapotAsync(teapotEntity);

                if (!isAdded)
                {
                    string errMsg = "Teapot hasn't been added by some reason";

                    _logger.LogError(errMsg);
                    throw new BusinessException(errMsg);
                }

                _logger.LogInformation("Teapot has been added");
            });

        }

        public async Task RemoveTeapotAsync(string teapotId)
        {
            await ExecuteSafeAsync(async () => {
                bool isRemoved = await _catalogItemProvider.RemoveTeapotAsync(teapotId);

                if (!isRemoved)
                {
                    string errMsg = "Teapot hasn't been removed by some reason";

                    _logger.LogError(errMsg);
                    throw new BusinessException(errMsg);
                }

                _logger.LogInformation("Teapot has been removed");
            });

        }

        public async Task UpdateTeapotAsync(string teapotId, TeapotRequest updatedTeapot)
        {
            await ExecuteSafeAsync(async () => {
                var mappedToTeapotEntity = _mapper.Map<TeapotEntity>(updatedTeapot);
                mappedToTeapotEntity.Id = teapotId;

                bool isUpdated = await _catalogItemProvider.UpdateTeapotAsync(mappedToTeapotEntity);
                if (!isUpdated)
                {
                    string errMsg = "Teapot hasn't been updated by some reason";

                    _logger.LogError(errMsg);
                    throw new BusinessException(errMsg);
                }

                _logger.LogInformation("Teapot has been updated");
            });

        }
    }
}
