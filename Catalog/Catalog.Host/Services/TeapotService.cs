using AutoMapper;
using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Catalog.Host.Providers.Abstractions;
using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;

namespace Catalog.Host.Services
{
    public class TeapotService : BaseDataService<ApplicationDbContext, TeapotService>, ITeapotService
    {
        private readonly ITeapotProvider _teapotProvider;
        private readonly ILogger<ITeapotService> _logger;
        private readonly IMapper _mapper;

        public TeapotService(ITeapotProvider teapotProvider, IMapper mapper, ILogger<TeapotService> logger, IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
            : base(dbContextWrapper, logger)
        {
            _teapotProvider = teapotProvider;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task AddTeapotAsync(TeapotRequest newTeapot)
        {
            await ExecuteSafeAsync(async () => {
                var teapotEntity = _mapper.Map<TeapotEntity>(newTeapot);

                bool isAdded = await _teapotProvider.AddTeapotAsync(teapotEntity);

                if (!isAdded)
                {
                    string errMsg = "Teapot hasn't been added by some reason!";

                    _logger.LogError(errMsg);
                    throw new Exception(errMsg);
                }

                _logger.LogInformation("Teapot was recieved");
            });
            
        }

        public async Task<List<TeapotResponse>> GetAllTeapotsAsync()
        {
            return await ExecuteSafeAsync(async () => {
                var recievedTeapots = await _teapotProvider.GetAllTeapotsAsync();

                if (recievedTeapots.Count == 0)
                {
                    _logger.LogError("Db is empty!");
                    throw new Exception("There are no any teapots!");
                }
                _logger.LogInformation("Teapots were recieved");

                var teapotsResponse = _mapper.Map<List<TeapotResponse>>(recievedTeapots);

                return teapotsResponse;
            });
        }

        public async Task<TeapotResponse?> GetTeapotByIdAsync(string teapotId)
        {
            return await ExecuteSafeAsync(async () => {
                var recievedTeapot = await _teapotProvider.GetTeapotByIdAsync(teapotId);

                if (recievedTeapot == null)
                {
                    string errMsg = "There are no any teapot with input id!";

                    _logger.LogError(errMsg);
                    throw new Exception(errMsg);
                }
                _logger.LogInformation("Teapot was recieved");

                var teapotResponse = _mapper.Map<TeapotResponse>(recievedTeapot);

                return teapotResponse;
            });
                
        }

        public async Task RemoveTeapotAsync(string teapotId)
        {
            await ExecuteSafeAsync(async () => {
                bool isRemoved = await _teapotProvider.RemoveTeapotAsync(teapotId);

                if (!isRemoved)
                {
                    string errMsg = "Teapot hasn't been removed by some reason";

                    _logger.LogError(errMsg);
                    throw new Exception(errMsg);
                }

                _logger.LogInformation("Teapot has been removed");
            });
            
        }

        public async Task UpdateTeapotAsync(string teapotId, TeapotRequest updatedTeapot)
        {
            await ExecuteSafeAsync(async () => {
                var mappedToTeapotEntity = _mapper.Map<TeapotEntity>(updatedTeapot);
                mappedToTeapotEntity.Id = teapotId;

                bool isUpdated = await _teapotProvider.UpdateTeapotAsync(mappedToTeapotEntity);
                if (!isUpdated)
                {
                    string errMsg = "Teapot hasn't been updated by some reason";

                    _logger.LogError(errMsg);
                    throw new Exception(errMsg);
                }

                _logger.LogInformation("Teapot has been updated");
            });
            
        }
    }
}
