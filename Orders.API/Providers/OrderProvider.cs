using Catalog.Host.Services.Abstractions;
using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Orders.API.Providers.Abstractions;

namespace Orders.API.Providers
{
    public class OrderProvider : IOrderProvider
    {
        private readonly ApplicationDbContext _dbContext;

        public OrderProvider(IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
        {
            _dbContext = dbContextWrapper.DbContext;
        }

        public async Task<OrderEntity?> GetOrderById(int orderId)
        {
            var receivedOrder = await _dbContext.Orders.SingleOrDefaultAsync(o => o.Id == orderId);
            return receivedOrder;
        }

        public async Task<List<OrderEntity>> GetOrders(Guid? userId)
        {
            var query = userId != null 
                ? _dbContext.Orders.Where(o => o.UserId == userId).AsQueryable()
                : _dbContext.Orders.AsQueryable();

            var receivedOrders = await query.ToListAsync();

            return receivedOrders;
        }

        public async Task<int> AddOrder(OrderEntity order)
        {
            var status = _dbContext.OrderStatuses.SingleOrDefault(os => os.StatusName == "Waiting for accept");

            if (status != null) 
            {
                order.OrderStatus = status;
            }

            await _dbContext.Orders.AddAsync(order);
            await _dbContext.SaveChangesAsync();

            return order.Id;
        }
    }
}
