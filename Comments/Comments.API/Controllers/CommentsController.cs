using Comments.API.RequestModels;
using Comments.API.ResponseModels;
using Comments.API.Services.Abstractions;
using Infrastracture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Comments.API.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsService _commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(PaginatedItemsResponse<CommentResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<PaginatedItemsResponse<CommentResponse>>> GetCommentsByTeapotId(string teapotId, int page = 1, int limit = 6)
        {
            var comments = await _commentsService.GetTeapotCommentsAsync(teapotId, page, limit);
            return Ok(comments);
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<PaginatedItemsResponse<CommentResponse>>> AddComment([FromBody] CommentRequest commentRequest)
        {
            await _commentsService.AddCommentAsync(commentRequest);
            return Ok("Comment has been added");
        }
    }
}