using Comments.API.RequestModels;
using Comments.API.ResponseModels;

namespace Comments.API.Services.Abstractions;

public interface ICommentsService
{
    public Task<CommentResponse?> GetCommentByIdAsync(string commentId);

    public Task<PaginatedItemsResponse<CommentResponse>> GetTeapotCommentsAsync(string teapotId, int page, int limit);

    public Task AddCommentAsync(CommentRequest newComment);
}