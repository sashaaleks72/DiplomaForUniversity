namespace Orders.API.RequestModels
{
    public class UpdateOrderRequest
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Patronymic { get; set;} = string.Empty;

        public string City { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        public string DeliveryAddress { get; set; } = string.Empty;

        public string OrderStatus { get; set;} = string.Empty;
    }
}
