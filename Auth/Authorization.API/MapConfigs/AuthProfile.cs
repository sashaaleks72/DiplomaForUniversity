using Authorization.API.RequestModels;
using Authorization.API.ResponseModels;
using AutoMapper;
using Data.Entities;

namespace Authorization.API.MapConfigs
{
    public class AuthProfile : Profile
    {
        public AuthProfile() 
        {
            CreateMap<RegistrationModel, UserEntity>()
                .ReverseMap();

            CreateMap<UserEntity, ProfileResponseModel>();
        }
    }
}
