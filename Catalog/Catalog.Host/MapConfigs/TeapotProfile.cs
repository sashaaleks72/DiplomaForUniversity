using AutoMapper;
using Catalog.Host.Data.Entities;
using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;

namespace Catalog.Host.MapConfigs
{
    public class TeapotProfile : Profile
    {
        public TeapotProfile() 
        {
            CreateMap<TeapotRequest, TeapotEntity>();
            CreateMap<TeapotEntity, TeapotResponse>();
        }
    }
}
