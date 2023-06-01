using Data.Entities;
using Orders.API.RequestModels;
using Orders.API.ResponseModels;

namespace Orders.API.Providers.Abstractions
{
    public interface IOrderProvider
    {
        public Task<int> AddOrder(OrderEntity order);

        public Task<List<OrderEntity>> GetOrders(Guid? userId);

        public Task<OrderEntity?> GetOrderById(int orderId);
    }
}
