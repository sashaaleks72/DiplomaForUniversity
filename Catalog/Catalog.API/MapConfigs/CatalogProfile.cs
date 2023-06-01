using AutoMapper;
using Data;
using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;
using Data.Entities;

namespace Catalog.Host.MapConfigs
{
    public class CatalogProfile : Profile
    {
        public CatalogProfile() 
        {
            CreateMap<TeapotRequest, TeapotEntity>();
            CreateMap<TeapotEntity, TeapotResponse>();
            CreateMap<CompanyEntity, CompanyResponse>();
            CreateMap<CompanyRequest, CompanyEntity>();
        }
    }
}
