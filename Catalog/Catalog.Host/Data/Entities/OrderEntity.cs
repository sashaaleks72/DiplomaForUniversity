namespace Catalog.Host.Data.Entities
{
    public class OrderEntity
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Patronymic { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string City { get; set; } = null!;

        public string Department { get; set; } = null!;

        public string DeliveryAddress { get; set; } = null!;

        public double TotalSum { get; set; } 

        public DateTime OrderDate { get; set; }

        public virtual OrderStatusEntity OrderStatus { get; set; } = null!;
        public int OrderStatusId { get; set; }

        public virtual UserEntity User { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }
}
