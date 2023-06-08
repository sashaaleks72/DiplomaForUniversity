using AutoMapper;
using Catalog.Host.Services.Abstractions;
using Chat.API.ResponseModels;
using Data;
using Infrastracture;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Chat.API.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ChatsController(IDbContextWrapper<ApplicationDbContext> dbContext, IMapper mapper)
        {
            _dbContext = dbContext.DbContext;
            _mapper = mapper;
        }

        
        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(List<ChatResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<List<ChatResponse>>> GetChats()
        {
            var chats = await _dbContext.Chats.ToListAsync();
            var responseData = _mapper.Map <List<ChatResponse>>(chats);

            return Ok(responseData);
        }
    }
}
