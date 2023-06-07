using Catalog.Host.Services.Abstractions;
using Microsoft.Extensions.Logging;

namespace Infrastructure.UnitTests.Mocks
{
    public sealed class MockService : BaseDataService<MockDbContext, MockService>
    {
        public MockService(IDbContextWrapper<MockDbContext> dbContextWrapper, ILogger<MockService> logger) : base(dbContextWrapper, logger)
        {
        }

        public async Task ExecuteWithException()
        {
            await ExecuteSafeAsync(() =>
            {
                throw new Exception("Test");
            }, CancellationToken.None);
        }

        public async Task ExecuteWithoutException()
        {
            await ExecuteSafeAsync(async () =>
            {
                await Task.CompletedTask;
            }, CancellationToken.None);
        }
    }
}
