
namespace Orders.API.ResponseModels
{
    public class CartItemResponse
    {
        public Guid TeapotId { get; set; } = Guid.NewGuid();

        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }
    }
}
