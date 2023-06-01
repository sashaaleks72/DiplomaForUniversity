using Catalog.Host.RequestModels;
using Data;
using Data.Entities;

namespace Catalog.UnitTests.Services
{
    public class CatalogCompanyServiceTest
    {
        private readonly ICatalogCompanyService _catalogCompanyService;

        private readonly Mock<ICatalogCompanyProvider> _catalogCompanyProvider;
        private readonly Mock<ILogger<CatalogCompanyService>> _logger;
        private readonly Mock<IMapper> _mapper;
        private readonly Mock<IDbContextWrapper<ApplicationDbContext>> _dbContextWrapper;

        public CatalogCompanyServiceTest()
        {
            _catalogCompanyProvider = new Mock<ICatalogCompanyProvider>();
            _mapper = new Mock<IMapper>();
            _logger = new Mock<ILogger<CatalogCompanyService>>();
            _dbContextWrapper = new Mock<IDbContextWrapper<ApplicationDbContext>>();

            var dbContextTransaction = new Mock<IDbContextTransaction>();
            _dbContextWrapper.Setup(d => d.BeginTransaction(CancellationToken.None)).ReturnsAsync(dbContextTransaction.Object);

            //_catalogCompanyService = new CatalogCompanyService(_catalogCompanyProvider.Object, _mapper.Object, _logger.Object, _dbContextWrapper.Object);
        }

        [Fact]
        public async Task AddCompanyAsync_IsAdded_Success()
        {
            //arrange
            var companyRequest = new CompanyRequest
            {
                Name = "Test",
            };

            var companyEntity = new CompanyEntity
            {
                Name = "Test"
            };

            _mapper.Setup(m => m.Map<CompanyEntity>(It.Is<CompanyRequest>(c => c == companyRequest))).Returns(companyEntity);

            _catalogCompanyProvider.Setup(c => c.AddCompanyAsync(It.Is<CompanyEntity>(c => c == companyEntity))).ReturnsAsync(true);

            //act
            await _catalogCompanyService.AddCompanyAsync(companyRequest);

            //assert
            _catalogCompanyProvider.Verify(c => c.AddCompanyAsync(companyEntity), Times.Once);
            _catalogCompanyProvider.Verify(c => c.DeleteCompanyByIdAsync(It.IsAny<CompanyEntity>()), Times.Never);
            _catalogCompanyProvider.Verify(c => c.UpdateCompanyAsync(It.IsAny<CompanyEntity>()), Times.Never);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Company has been added!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task AddCompanyAsync_IsNotAdded_ExceptionThrown()
        {
            //arrange
            var companyRequest = new CompanyRequest
            {
                Name = "Test",
            };

            var companyEntity = new CompanyEntity
            {
                Name = "Test"
            };

            _mapper.Setup(m => m.Map<CompanyEntity>(It.Is<CompanyRequest>(c => c == companyRequest))).Returns(companyEntity);

            _catalogCompanyProvider.Setup(c => c.AddCompanyAsync(It.Is<CompanyEntity>(c => c == companyEntity))).ReturnsAsync(false);

            //act
            var action = async () =>
            {
                await _catalogCompanyService.AddCompanyAsync(companyRequest);
            };

            //assert
            await action.Should().ThrowAsync<Exception>().WithMessage("Company hasn't been added by some reason!");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Company hasn't been added by some reason!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task DeleteCompanyByIdAsync_IsRemoved_Success()
        {
            //arrange
            var id = 1;

            _catalogCompanyProvider.Setup(c => c.DeleteCompanyByIdAsync(It.IsAny<CompanyEntity>())).ReturnsAsync(true);

            //act
            await _catalogCompanyService.DeleteCompanyByIdAsync(id);

            //assert
            _catalogCompanyProvider.Verify(c => c.AddCompanyAsync(It.IsAny<CompanyEntity>()), Times.Never);
            _catalogCompanyProvider.Verify(c => c.DeleteCompanyByIdAsync(It.IsAny<CompanyEntity>()), Times.Once);
            _catalogCompanyProvider.Verify(c => c.UpdateCompanyAsync(It.IsAny<CompanyEntity>()), Times.Never);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Company has been removed!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task DeleteCompanyByIdAsync_IsNotRemoved_ExceptionThrown()
        {
            //arrange
            var id = 0;

            var companyEntity = new CompanyEntity
            {
                Id = id
            };

            _catalogCompanyProvider.Setup(c => c.DeleteCompanyByIdAsync(It.Is<CompanyEntity>(c => c == companyEntity))).ReturnsAsync(false);

            //act
            var action = async () =>
            {
                await _catalogCompanyService.DeleteCompanyByIdAsync(id);
            };

            //assert
            await action.Should().ThrowAsync<Exception>().WithMessage("Company hasn't been removed by some reason!");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Company hasn't been removed by some reason!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task UpdateCompanyAsync_IsUpdated_Success()
        {
            //arrange
            var id = 1;

            var companyRequest = new CompanyRequest
            {
                Name = "Test",
            };

            var companyEntity = new CompanyEntity
            {
                Name = "Test"
            };

            _mapper.Setup(m => m.Map<CompanyEntity>(It.Is<CompanyRequest>(c => c == companyRequest))).Returns(companyEntity);

            _catalogCompanyProvider.Setup(c => c.UpdateCompanyAsync(It.Is<CompanyEntity>(c => c == companyEntity))).ReturnsAsync(true);

            //act
            await _catalogCompanyService.UpdateCompanyAsync(id, companyRequest);

            //assert
            _catalogCompanyProvider.Verify(c => c.AddCompanyAsync(It.IsAny<CompanyEntity>()), Times.Never);
            _catalogCompanyProvider.Verify(c => c.DeleteCompanyByIdAsync(It.IsAny<CompanyEntity>()), Times.Never);
            _catalogCompanyProvider.Verify(c => c.UpdateCompanyAsync(companyEntity), Times.Once);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Company has been updated!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task UpdateCompanyAsync_IsNotUpdated_ExceptionThrown()
        {
            var id = 0;

            var companyRequest = new CompanyRequest
            {
                Name = "Test",
            };

            var companyEntity = new CompanyEntity
            {
                Name = "Test"
            };

            _mapper.Setup(m => m.Map<CompanyEntity>(It.Is<CompanyRequest>(c => c == companyRequest))).Returns(companyEntity);

            _catalogCompanyProvider.Setup(c => c.UpdateCompanyAsync(It.Is<CompanyEntity>(c => c == companyEntity))).ReturnsAsync(false);

            //act
            var action = async () =>
            {
                await _catalogCompanyService.UpdateCompanyAsync(id, companyRequest);
            };

            //assert
            await action.Should().ThrowAsync<Exception>().WithMessage("Company hasn't been updated by some reason!");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Company hasn't been updated by some reason!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }
    }
}
