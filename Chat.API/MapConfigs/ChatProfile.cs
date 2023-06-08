using AutoMapper;
using Chat.API.ResponseModels;
using Data.Entities;

namespace Chat.API.MapConfigs
{
    public class ChatProfile : Profile
    {
        public ChatProfile() 
        {
            CreateMap<ChatEntity, ChatResponse>();
        }
    }
}
