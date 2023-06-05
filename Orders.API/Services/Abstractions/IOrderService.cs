using Orders.API.RequestModels;
using Orders.API.ResponseModels;

namespace Orders.API.Services.Abstractions
{
    public interface IOrderService
    {
        public Task MakeAnOrder(OrderRequest order);

        public Task<List<OrderResponse>> GetOrders(Guid? userId);

        public Task<OrderResponse?> GetOrderById(int orderId);

        public Task UpdateOrder(int orderId, UpdateOrderRequest updateOrderRequest);
    }
}
