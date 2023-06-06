using AutoMapper;
using Catalog.Host.Services.Abstractions;
using Comments.API.Repositrories.Abstractions;
using Comments.API.RequestModels;
using Comments.API.ResponseModels;
using Comments.API.Services.Abstractions;
using Data;
using Data.Entities;
using Infrastructure.Exceptions;

namespace Comments.API.Services;

public class CommentsService : BaseDataService<ApplicationDbContext, CommentsService>, ICommentsService
{   
    private readonly ICommentsRepository _commentsRepository;
    private readonly ILogger<CommentsService> _logger;
    private readonly IMapper _mapper;

    public CommentsService(ICommentsRepository commentsRepository, 
        ILogger<CommentsService> logger,
        IMapper mapper, IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
        IHttpContextAccessor httpContext
        ) 
        : base(dbContextWrapper, logger)
    {
        _commentsRepository = commentsRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<PaginatedItemsResponse<CommentResponse>> GetTeapotCommentsAsync(string teapotId, int page, int limit)
    {
        return await ExecuteSafeAsync(async () => {
            var recievedComments = await _commentsRepository.GetTeapotCommentsAsync(teapotId, page, limit);

            if (recievedComments.Data.Count() == 0)
            {
                _logger.LogError("Data list is empty!");
                throw new BusinessException("There are no any comment in the list!");
            }
            _logger.LogInformation("Comments have been recieved");

            var commentsResponse = _mapper.Map<List<CommentResponse>>(recievedComments.Data);

            var paginatedItemsResponse = new PaginatedItemsResponse<CommentResponse>
            {
                Data = commentsResponse,
                Limit = limit,
                Page = page,
                TotalQuantity = recievedComments.TotalQuantity
            };

            return paginatedItemsResponse;
        });
    }

    public async Task AddCommentAsync(CommentRequest newComment)
    {
        await ExecuteSafeAsync(async () =>
        {
            var commentToAdd = _mapper.Map<CommentEntity>(newComment);
            var isAdded = await _commentsRepository.AddCommentAsync(commentToAdd);

            if (!isAdded)
            {
                throw new BusinessException("Comment hasn't been added by some reason");
            }
        });
    }
}