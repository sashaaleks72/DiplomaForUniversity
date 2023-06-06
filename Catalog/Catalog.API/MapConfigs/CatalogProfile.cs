using AutoMapper;
using Data;
using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;
using Data.Entities;
using System.Globalization;

namespace Catalog.Host.MapConfigs
{
    public class CatalogProfile : Profile
    {
        public CatalogProfile() 
        {
            CreateMap<TeapotRequest, TeapotEntity>();
            CreateMap<TeapotEntity, TeapotResponse>()
                .ForMember(dest => dest.Company, opt => opt.MapFrom(s => s.Company.Name));

            CreateMap<CompanyEntity, CompanyResponse>();
            CreateMap<CompanyRequest, CompanyEntity>();
        }
    }
}
