using Authorization.API.RequestModels;
using Authorization.API.ResponseModels;
using AutoMapper;
using Data.Entities;
using System.Globalization;

namespace Authorization.API.MapConfigs
{
    public class AuthProfile : Profile
    {
        public AuthProfile() 
        {
            CreateMap<RegistrationModel, UserEntity>()
                .ForMember(dest => dest.Birthday, opt => opt.MapFrom(s => DateTime.ParseExact(s.Birthday, "dd.MM.yyyy", CultureInfo.InvariantCulture)))
                .ForMember(dest => dest.RefreshToken, opt => opt.MapFrom(s => ""));

            CreateMap<UserEntity, ProfileResponseModel>()
                .ForMember(dest => dest.Birthday, opt => opt.MapFrom(s => s.Birthday.ToString("dd.MM.yyyy")));
        }
    }
}
