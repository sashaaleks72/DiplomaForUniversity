﻿namespace Orders.API.RequestModels
{
    public class OrderRequest
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Patronymic { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        public string DeliveryAddress { get; set; } = string.Empty;

        public double TotalSum { get; set; }

        public List<CartItemRequest> CartItems { get; set; } = null!;

        public Guid UserId { get; set; }

    }
}
