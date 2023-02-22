namespace Catalog.Host.Services.Abstractions
{
    public interface IDbContextWrapper<T> where T : DbContext
    {
        public T DbContext { get; }
        public Task<IDbContextTransaction> BeginTransaction(CancellationToken token = default);
    }
}
