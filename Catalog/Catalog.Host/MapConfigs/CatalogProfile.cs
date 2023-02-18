using AutoMapper;
using Catalog.Host.Data.Entities;
using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;

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
