using Infrastracture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Orders.API.RequestModels;
using Orders.API.ResponseModels;
using Orders.API.Services.Abstractions;
using System.Net;

namespace Orders.API.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Authorize(Roles = "Client")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> AddOrder(OrderRequest newOrder)
        {
            await _orderService.MakeAnOrder(newOrder);
            return Ok("Order has been added!");
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(List<OrderResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<List<OrderResponse>>> GetOrders(Guid? userId, string? status)
        { 
            var receivedOrders = await _orderService.GetOrders(userId, status);
            return Ok(receivedOrders);
        }

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(OrderResponse), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> GetOrderById([FromRoute] int id)
        {
            var receivedOrder = await _orderService.GetOrderById(id);
            return Ok(receivedOrder);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> UpdateOrder([FromRoute] int id, [FromBody] UpdateOrderRequest orderRequest)
        {
            await _orderService.UpdateOrder(id, orderRequest);
            return Ok("Order has been updated!");
        }
    }
}
