using Infrastracture;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Chat.API.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class ChatController : ControllerBase
    {

        public ChatController()
        {
        }

        /*
        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<string>> Post()
        {
            var teapots = await _catalogService.GetTeapotsAsync(sort, order, page, limit);
            return Ok(teapots);
        }
        */
    }
}
