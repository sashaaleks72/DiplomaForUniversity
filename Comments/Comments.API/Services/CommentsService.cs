using Catalog.Host.Services.Abstractions;
using Comments.API.RequestModels;
using Comments.API.ResponseModels;
using Comments.API.Services.Abstractions;
using Data;

namespace Comments.API.Services;

public class CommentsService : BaseDataService<ApplicationDbContext, CommentsService>, ICommentsService
{
    public CommentsService(IDbContextWrapper<ApplicationDbContext> dbContextWrapper, ILogger<CommentsService> logger) : base(dbContextWrapper, logger)
    {
    }

    public Task<CommentResponse?> GetCommentByIdAsync(string commentId)
    {
        throw new NotImplementedException();
    }

    public Task<PaginatedItemsResponse<CommentResponse>> GetTeapotCommentsAsync(string teapotId, int page, int limit)
    {
        throw new NotImplementedException();
    }

    public Task AddCommentAsync(CommentRequest newComment)
    {
        throw new NotImplementedException();
    }
}