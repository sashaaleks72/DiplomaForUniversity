using AutoMapper;
using Comments.API.RequestModels;
using Comments.API.ResponseModels;
using Data.Entities;

namespace Comments.API.MapConfigs;

public class CommentsProfile : Profile
{
    public CommentsProfile()
    {
        CreateMap<CommentRequest, CommentEntity>();
        CreateMap<CommentEntity, CommentResponse>()
            .ForMember(dest => dest.UserFullName, opts => opts.MapFrom(s => $"{s.User.FirstName} {s.User.LastName}"));
    }
}