using Catalog.Host.Services.Abstractions;

namespace Catalog.Host.Services
{
    public class DbContextWrapper<T> : IDbContextWrapper<T> 
        where T: DbContext 
    {
        private readonly T _dbContext;

        public DbContextWrapper(IDbContextFactory<T> dbContextFactory) 
        {
            _dbContext = dbContextFactory.CreateDbContext();
        }

        public T DbContext => _dbContext;

        public async Task<IDbContextTransaction> BeginTransaction(CancellationToken token = default)
        {
            return await _dbContext.Database.BeginTransactionAsync(token);
        }
    }
}
