
namespace Catalog.Host.Services.Abstractions
{
    public abstract class BaseDataService<T, L>
        where T : DbContext
        where L : BaseDataService<T, L>
    {
        private readonly IDbContextWrapper<T> _dbContextWrapper;
        private readonly ILogger<L> _logger;

        protected BaseDataService(IDbContextWrapper<T> dbContextWrapper, ILogger<L> logger)
        {
            _dbContextWrapper = dbContextWrapper;
            _logger = logger;
        }

        protected Task ExecuteSafeAsync(Func<Task> action, CancellationToken cancellationToken = default) => ExecuteSafeAsync(token => action(), cancellationToken);

        protected Task<TResult> ExecuteSafeAsync<TResult>(Func<Task<TResult>> action, CancellationToken cancellationToken = default) => ExecuteSafeAsync(token => action(), cancellationToken);

        private async Task ExecuteSafeAsync(Func<CancellationToken, Task> Action, CancellationToken cancellationToken = default)
        {
            await using var transaction = await _dbContextWrapper.BeginTransaction(cancellationToken);

            try
            {
                await Action(cancellationToken);

                await transaction.CommitAsync(cancellationToken);
                _logger.LogInformation("Transaction commited");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                _logger.LogError($"Transaction rollbacked with exception:\n {ex}");
            }
        }

        private async Task<TResult> ExecuteSafeAsync<TResult>(Func<CancellationToken, Task<TResult>> action, CancellationToken cancellationToken = default)
        {
            await using var transaction = await _dbContextWrapper.BeginTransaction(cancellationToken);

            try
            {
                var result = await action(cancellationToken);

                await transaction.CommitAsync(cancellationToken);
                _logger.LogInformation("Transaction commited");

                return result;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                _logger.LogError($"Transaction rollbacked with exception:\n {ex}");
            }

            return default(TResult)!;
        }
    }
}
