using Comments.API.Repositrories.Abstractions;
using Data;
using Data.Entities;

namespace Comments.API.Repositrories;

public class CommentsRepository: ICommentsRepository
{
    public Task<bool> AddCommentAsync(CommentEntity newComment)
    {
        throw new NotImplementedException();
    }

    public Task<PaginatedItems<CommentEntity>> GetTeapotCommentsAsync(string teapotId, int page, int limit)
    {
        throw new NotImplementedException();
    }

    public Task<CommentEntity> GetCommentByIdAsync(int commentId)
    {
        throw new NotImplementedException();
    }
}