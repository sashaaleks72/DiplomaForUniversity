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
                    _logger.LogInformation("Order received");

                    orderResponse = order == null 
                    ? throw new BusinessException("Order with input id doesn't exist!")
                    : _mapper.Map<OrderResponse>(order);
                    _logger.LogInformation("Order mapped");
                }

                return orderResponse;
            });
        }

        public async Task<List<OrderResponse>> GetOrders(Guid? userId)
        {
            return await ExecuteSafeAsync(async () =>
            {
                var receivedOrders = await _orderProvider.GetOrders(userId);
                var ordersResponses = _mapper.Map<List<OrderResponse>>(receivedOrders);

                return ordersResponses;
            });
        }

        public async Task<int> MakeAnOrder(OrderRequest newOrder)
        {
            var order = _mapper.Map<OrderEntity>(newOrder);
            int id = await _orderProvider.AddOrder(order);

            return id;
        }
    }
}
