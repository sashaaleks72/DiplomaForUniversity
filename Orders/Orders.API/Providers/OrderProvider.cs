using Catalog.Host.Services.Abstractions;
using Data;
using Data.Entities;
using Infrastructure.Exceptions;
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

        public async Task<List<OrderEntity>> GetOrders(Guid? userId, string? status)
        {
            var query = _dbContext.Orders.AsQueryable(); 

            if (userId != null)
            {
                query = _dbContext.Orders.Where(o => o.UserId == userId).AsQueryable();
            }

            if (status != null)
            {
                query = query.Where(o => o.OrderStatus.StatusName == status).AsQueryable();
            }

            var receivedOrders = await query.ToListAsync();

            return receivedOrders;
        }

        public async Task<bool> UpdateOrder(OrderEntity updatedOrder)
        {
            bool isOrderEntityUpdated = false;
            var orderToUpdate = await _dbContext.Orders.SingleOrDefaultAsync(o => o.Id == updatedOrder.Id);
            var orderStatus = await _dbContext.OrderStatuses.SingleOrDefaultAsync(s => s.StatusName == updatedOrder.OrderStatus.StatusName);

            if (orderStatus == null)
            {
                throw new BusinessException("Order status isn't received!");
            }

            Type typeOfOrderEntity = typeof(OrderEntity);
            var properties = typeOfOrderEntity.GetProperties();

            foreach (var property in properties)
            {
                if (property.Name == "OrderDate" || property.Name == "UserId" || property.Name == "TotalSum" || property.Name == "OrderStatus") continue;

                var updatedValue = property.GetValue(updatedOrder);
                var currentValue = property.GetValue(orderToUpdate);

                if (updatedValue != null && !updatedValue.Equals(currentValue))
                {
                    property.SetValue(orderToUpdate, updatedValue);
                }
            }

            orderToUpdate!.OrderStatusId = orderStatus.Id;
            isOrderEntityUpdated = await _dbContext.SaveChangesAsync() > 0;

            return isOrderEntityUpdated;
        }

        public async Task<bool> AddOrder(OrderEntity order, List<OrderProductEntity> orderProducts)
        {
            bool isOrderCompleted = false;
            bool isOrderEntitySaved = false;

            var status = _dbContext.OrderStatuses.SingleOrDefault(os => os.StatusName == "Pending");

            if (status != null) 
            {
                order.OrderStatus = status;
                order.OrderDate = DateTime.UtcNow;

                await _dbContext.Orders.AddAsync(order);
                isOrderEntitySaved = await _dbContext.SaveChangesAsync() > 0;
            }

            if (isOrderEntitySaved)
            {
                await _dbContext.OrderItems.AddRangeAsync(orderProducts);
                isOrderCompleted = await _dbContext.SaveChangesAsync() > 0;
            }

            return isOrderCompleted;
        }
    }
}
