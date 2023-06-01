namespace Data.Entities;

public class OrderProductEntity
{
    public int Id { get; set; }

    public virtual TeapotEntity Teapot { get; set; } = null!;
    public string TeapotId { get; set; } = null!;

    public virtual OrderEntity Order { get; set; } = null!;
    public int OrderId { get; set; }

    public double Price { get; set; }

    public int Quantity { get; set; }
}
