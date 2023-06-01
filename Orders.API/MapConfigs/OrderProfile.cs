using AutoMapper;
using Data;
using Data.Entities;
using Orders.API.RequestModels;
using Orders.API.ResponseModels;

namespace Catalog.Host.MapConfigs
{
    public class OrderProfile : Profile
    {
        public OrderProfile() 
        {
            CreateMap<OrderEntity, OrderResponse>()
                .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(s => s.OrderStatus.StatusName));

            CreateMap<OrderProductEntity, CartItemResponse>();

            CreateMap<OrderRequest, OrderEntity>()
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(s => DateTime.UtcNow));
            CreateMap<CartItemRequest, OrderProductEntity>()
                .ForMember(dest => dest., opt => opt.MapFrom(s => DateTime.UtcNow));
        }
    }
}
