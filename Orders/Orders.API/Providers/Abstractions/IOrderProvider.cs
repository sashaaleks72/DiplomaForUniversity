using Data.Entities;
using Orders.API.RequestModels;
using Orders.API.ResponseModels;

namespace Orders.API.Providers.Abstractions
{
    public interface IOrderProvider
    {
        public Task<bool> AddOrder(OrderEntity order, List<OrderProductEntity> orderProducts);

        public Task<List<OrderEntity>> GetOrders(Guid? userId, string? status);

        public Task<OrderEntity?> GetOrderById(int orderId);

        public Task<bool> UpdateOrder(OrderEntity updatedOrder);
    }
}
