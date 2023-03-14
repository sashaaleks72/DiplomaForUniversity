using Catalog.Host.RequestModels;
using Catalog.Host.Services.Abstractions;
using Infrastracture;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Catalog.Host.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class CatalogItemController : ControllerBase
    {
        private readonly ICatalogItemService _catalogItemService;

        public CatalogItemController(ICatalogItemService catalogItemService) 
        {
            _catalogItemService = catalogItemService;
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> Add(TeapotRequest newTeapot)
        {
            await _catalogItemService.AddTeapotAsync(newTeapot);
            return Ok("Teapot has been added!");
        }

        [HttpPut("{id}")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> Edit(string id, TeapotRequest updatedTeapot)
        {
            await _catalogItemService.UpdateTeapotAsync(id, updatedTeapot);
            return Ok("Teapot has been updated!");
        }

        [HttpDelete("{id}")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> Delete(string id)
        {
            await _catalogItemService.RemoveTeapotAsync(id);
            return Ok("Teapot has been deleted!");
        }
    }
}
