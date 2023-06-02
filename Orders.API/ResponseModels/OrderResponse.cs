
namespace Orders.API.ResponseModels
{
    public class OrderResponse
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Patronymic { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        public string DeliveryAddress { get; set; } = string.Empty;

        public string OrderStatus { get; set; } = string.Empty;

        public string OrderDate { get; set; } = string.Empty;

        public double TotalSum { get; set; }

        public List<CartItemResponse> CartItems { get; set; } = null!;
    }
}
