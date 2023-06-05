using Catalog.Host.Services.Abstractions;
using Comments.API.Repositrories.Abstractions;
using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Comments.API.Repositrories;

public class CommentsRepository: ICommentsRepository
{
    private readonly ApplicationDbContext _dbContext;

    public CommentsRepository(IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
    {
        _dbContext = dbContextWrapper.DbContext;
    }

    public async Task<bool> AddCommentAsync(CommentEntity newComment)
    {
        await _dbContext.Comments.AddAsync(newComment);
        int quantityOfSavedEntries = await _dbContext.SaveChangesAsync();

        return quantityOfSavedEntries > 0;
    }

    public async Task<PaginatedItems<CommentEntity>> GetTeapotCommentsAsync(string teapotId, int page, int limit)
    {
        var totalCount = await _dbContext.Comments.CountAsync();

        var recievedComments = await _dbContext.Comments
            .Where(c => c.TeapotId == teapotId)
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToListAsync();

        var paginatedItems = new PaginatedItems<CommentEntity>
        {
            Data = recievedComments,
            TotalQuantity = totalCount
        };

        return paginatedItems;
    }
}