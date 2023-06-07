using Comments.API.ResponseModels;
using Data;
using Data.Entities;

namespace Comments.API.Repositrories.Abstractions;

public interface ICommentsRepository
{
    public Task<bool> AddCommentAsync(CommentEntity newComment);
    public Task<PaginatedItems<CommentEntity>> GetTeapotCommentsAsync(string teapotId, int page, int limit);
}