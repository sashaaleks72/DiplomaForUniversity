using Catalog.Host.RequestModels;
using Data.Entities;
using Data;

namespace Catalog.UnitTests.Services
{
    public class CatalogItemServiceTest
    {
        private readonly ICatalogItemService _catalogItemService;

        private readonly Mock<ICatalogItemProvider> _catalogItemProvider;
        private readonly Mock<ILogger<CatalogItemService>> _logger;
        private readonly Mock<IMapper> _mapper;
        private readonly Mock<IDbContextWrapper<ApplicationDbContext>> _dbContextWrapper;

        public CatalogItemServiceTest()
        {
            _catalogItemProvider = new Mock<ICatalogItemProvider>();
            _mapper = new Mock<IMapper>();
            _logger = new Mock<ILogger<CatalogItemService>>();
            _dbContextWrapper = new Mock<IDbContextWrapper<ApplicationDbContext>>();

            var dbContextTransaction = new Mock<IDbContextTransaction>();
            _dbContextWrapper.Setup(d => d.BeginTransaction(CancellationToken.None)).ReturnsAsync(dbContextTransaction.Object);

            //_catalogItemService = new CatalogItemService(_catalogItemProvider.Object, _mapper.Object, _logger.Object, _dbContextWrapper.Object);
        }

        [Fact]
        public async Task AddTeapotAsync_IsAdded_Success()
        {
            //arrange
            var teapotRequest = new TeapotRequest
            {
                Name = "Test"
            };

            var teapotEntity = new TeapotEntity
            {
                Name = "Test"
            };

            _mapper.Setup(m => m.Map<TeapotEntity>(It.Is<TeapotRequest>(t => t == teapotRequest))).Returns(teapotEntity);

            _catalogItemProvider.Setup(c => c.AddTeapotAsync(It.Is<TeapotEntity>(t => t == teapotEntity))).ReturnsAsync(true);

            //act
            await _catalogItemService.AddTeapotAsync(teapotRequest);

            //assert
            _catalogItemProvider.Verify(c => c.AddTeapotAsync(teapotEntity), Times.Once);
            _catalogItemProvider.Verify(c => c.RemoveTeapotAsync(It.IsAny<string>()), Times.Never);
            _catalogItemProvider.Verify(c => c.UpdateTeapotAsync(It.IsAny<TeapotEntity>()), Times.Never);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Teapot has been added")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task AddTeapotAsync_IsNotAdded_ExceptionThrown()
        {
            //arrange
            var teapotRequest = new TeapotRequest
            {
                Name = "Test"
            };

            var teapotEntity = new TeapotEntity
            {
                Name = "Test"
            };

            _mapper.Setup(m => m.Map<TeapotEntity>(It.Is<TeapotRequest>(t => t == teapotRequest))).Returns(teapotEntity);

            _catalogItemProvider.Setup(c => c.AddTeapotAsync(It.Is<TeapotEntity>(t => t == teapotEntity))).ReturnsAsync(false);

            //act
            var action = async () => 
            {
                await _catalogItemService.AddTeapotAsync(teapotRequest);
            };

            //assert
            await action.Should().ThrowAsync<Exception>().WithMessage("Teapot hasn't been added by some reason");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Teapot hasn't been added by some reason")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task RemoveTeapotAsync_IsRemoved_Success()
        {
            //arrange
            var id = "1";
            _catalogItemProvider.Setup(c => c.RemoveTeapotAsync(It.Is<string>(i => i == id))).ReturnsAsync(true);

            //act
            await _catalogItemService.RemoveTeapotAsync(id);

            //assert
            _catalogItemProvider.Verify(c => c.AddTeapotAsync(It.IsAny<TeapotEntity>()), Times.Never);
            _catalogItemProvider.Verify(c => c.RemoveTeapotAsync(id), Times.Once);
            _catalogItemProvider.Verify(c => c.UpdateTeapotAsync(It.IsAny<TeapotEntity>()), Times.Never);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Teapot has been removed")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task RemoveTeapotAsync_IsNotRemoved_ExceptionThrown()
        {
            //arrange
            var id = "0";
            _catalogItemProvider.Setup(c => c.RemoveTeapotAsync(It.Is<string>(i => i == id))).ReturnsAsync(false);

            //act
            var action = async () =>
            {
                await _catalogItemService.RemoveTeapotAsync(id);
            };

            //assert
            await action.Should().ThrowAsync<Exception>().WithMessage("Teapot hasn't been removed by some reason");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Teapot hasn't been removed by some reason")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task UpdateTeapotAsync_IsUpdated_Success()
        {
            //arrange
            var id = "1";

            var teapotRequest = new TeapotRequest
            {
                Name = "Test"
            };

            var teapotEntity = new TeapotEntity
            {
                Name = "Test"
            };

            _mapper.Setup(m => m.Map<TeapotEntity>(It.Is<TeapotRequest>(t => t == teapotRequest))).Returns(teapotEntity);

            _catalogItemProvider.Setup(c => c.UpdateTeapotAsync(It.Is<TeapotEntity>(t => t == teapotEntity))).ReturnsAsync(true);

            //act
            await _catalogItemService.UpdateTeapotAsync(id, teapotRequest);

            //assert
            _catalogItemProvider.Verify(c => c.AddTeapotAsync(It.IsAny<TeapotEntity>()), Times.Never);
            _catalogItemProvider.Verify(c => c.RemoveTeapotAsync(It.IsAny<string>()), Times.Never);
            _catalogItemProvider.Verify(c => c.UpdateTeapotAsync(teapotEntity), Times.Once);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Teapot has been updated")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task UpdateTeapotAsync_IsNotUpdated_ExceptionThrown()
        {
            //arrange
            var id = "0";

            var teapotRequest = new TeapotRequest
            {
                Name = "Test"
            };

            var teapotEntity = new TeapotEntity
            {
                Name = "Test"
            };

            _mapper.Setup(m => m.Map<TeapotEntity>(It.Is<TeapotRequest>(t => t == teapotRequest))).Returns(teapotEntity);

            _catalogItemProvider.Setup(c => c.UpdateTeapotAsync(It.Is<TeapotEntity>(t => t == teapotEntity))).ReturnsAsync(false);

            //act
            var action = async () =>
            {
                await _catalogItemService.UpdateTeapotAsync(id, teapotRequest);
            };

            //assert
            await action.Should().ThrowAsync<Exception>().WithMessage("Teapot hasn't been updated by some reason");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Teapot hasn't been updated by some reason")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }
    }
}
