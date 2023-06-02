using AutoMapper;
using Data.Entities;
using Orders.API.RequestModels;
using Orders.API.ResponseModels;

namespace Catalog.Host.MapConfigs
{
    public class OrderProfile : Profile
    {
        public OrderProfile() 
        {
            CreateMap<OrderRequest, OrderEntity>();
            CreateMap<CartItemRequest, OrderProductEntity>();

            CreateMap<OrderEntity, OrderResponse>()
                .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(s => s.OrderStatus.StatusName))
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(s => s.OrderDate.ToString("dd.MM.yyyy")));
            CreateMap<OrderProductEntity, CartItemResponse>()
                .ForMember(dest => dest.ImgName, opt => opt.MapFrom(s => s.Teapot.ImgName))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(s => s.Teapot.Name));

            CreateMap<UpdateOrderRequest, OrderEntity>()
                .ForMember(dest => dest.OrderStatus, opt => opt.MapFrom(s => new OrderStatusEntity { StatusName = s.OrderStatus }));
        }
    }
}
