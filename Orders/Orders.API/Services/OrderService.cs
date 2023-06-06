using AutoMapper;
using Catalog.Host.Services.Abstractions;
using Data;
using Data.Entities;
using Infrastructure.Exceptions;
using Orders.API.Providers.Abstractions;
using Orders.API.RequestModels;
using Orders.API.ResponseModels;
using Orders.API.Services.Abstractions;

namespace Orders.API.Services
{
    public class OrderService : BaseDataService<ApplicationDbContext, OrderService>, IOrderService
    {
        private readonly IOrderProvider _orderProvider;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public OrderService(IOrderProvider orderProvider, ILogger<OrderService> logger, IMapper mapper, IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
            : base(dbContextWrapper, logger)
        {
            _orderProvider = orderProvider;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<OrderResponse?> GetOrderById(int orderId)
        {
            return await ExecuteSafeAsync(async () =>
            {
                OrderResponse? orderResponse = null;

                if (orderId > 0)
                {
                    var order = await _orderProvider.GetOrderById(orderId);

                    orderResponse = order == null 
                    ? throw new BusinessException("Order with input id doesn't exist!")
                    : _mapper.Map<OrderResponse>(order);

                    orderResponse.CartItems = _mapper.Map<List<CartItemResponse>>(order.OrderProducts);
                }

                return orderResponse;
            });
        }

        public async Task<List<OrderResponse>> GetOrders(Guid? userId, string? status)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var receivedOrders = await _orderProvider.GetOrders(userId, status);
                var ordersResponses = _mapper.Map<List<OrderResponse>>(receivedOrders);

                for (int i = 0; i < ordersResponses.Count; i++)
                {
                    ordersResponses[i].CartItems = _mapper.Map<List<CartItemResponse>>(receivedOrders[i].OrderProducts);
                }

                return ordersResponses;
            });
        }

        public async Task UpdateOrder(int orderId, UpdateOrderRequest updateOrderRequest)
        {
            await ExecuteSafeAsync(async () => {
                var orderToUpdate = _mapper.Map<OrderEntity>(updateOrderRequest);
                orderToUpdate.Id = orderId;

                bool isUpdated = await _orderProvider.UpdateOrder(orderToUpdate);

                if (!isUpdated)
                {
                    throw new BusinessException("Order isn't updated by some reason");
                }
            });
        }

        public async Task MakeAnOrder(OrderRequest requestOrder)
        {
            var order = _mapper.Map<OrderEntity>(requestOrder);
            var orderProducts = _mapper.Map<List<OrderProductEntity>>(requestOrder.CartItems);

            foreach (var item in orderProducts) 
            {
                item.Order = order;
            }

            bool isCompleted = await _orderProvider.AddOrder(order, orderProducts);

            if (!isCompleted) throw new BusinessException("Order hasn't been created by some reason");
        }
    }
}
