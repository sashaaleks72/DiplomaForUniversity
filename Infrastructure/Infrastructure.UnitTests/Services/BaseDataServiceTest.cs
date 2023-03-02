using Catalog.Host.Services.Abstractions;
using Infrastructure.UnitTests.Mocks;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;
using Moq;

namespace Infrastructure.UnitTests.Services
{
    public class BaseDataServiceTest
    {
        private readonly MockService _mockService;

        private readonly Mock<IDbContextWrapper<MockDbContext>> _dbContextWrapper;
        private readonly Mock<ILogger<MockService>> _logger;
        private readonly Mock<IDbContextTransaction> _dbContextTransaction;

        public BaseDataServiceTest() 
        {
            _dbContextWrapper = new Mock<IDbContextWrapper<MockDbContext>>();
            _logger = new Mock<ILogger<MockService>>();

            _dbContextTransaction = new Mock<IDbContextTransaction>();
            _dbContextWrapper.Setup(db => db.BeginTransaction(CancellationToken.None)).ReturnsAsync(_dbContextTransaction.Object);

            _mockService = new MockService(_dbContextWrapper.Object, _logger.Object);
        }

        [Fact]
        public async Task ExecuteSafeAsync_TestingTryScope_Success()
        {
            //arrange

            //act
            await _mockService.ExecuteWithoutException();
            
            //assert
            _dbContextTransaction.Verify(d => d.CommitAsync(CancellationToken.None), Times.Once);
            _dbContextTransaction.Verify(d => d.RollbackAsync(CancellationToken.None), Times.Never);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Transaction commited")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task ExecuteSafeAsync_TestingCatchScope_Failed()
        {
            //arrange

            //act
            await _mockService.ExecuteWithException();

            //assert
            _dbContextTransaction.Verify(d => d.CommitAsync(CancellationToken.None), Times.Never);
            _dbContextTransaction.Verify(d => d.RollbackAsync(CancellationToken.None), Times.Once);

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Contains("Transaction rollbacked with exception:")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }
    }
}
