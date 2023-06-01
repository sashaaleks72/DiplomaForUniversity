namespace Orders.API.RequestModels
{
    public class CartItemRequest
    {
        public Guid TeapotId { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; } 

        public double Price { get; set; }
    }
}
