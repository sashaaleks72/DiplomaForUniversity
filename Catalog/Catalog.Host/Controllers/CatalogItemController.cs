using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;
using Infrastracture;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult> Add(TeapotRequest newTeapot)
        {
            try
            {
                await _catalogItemService.AddTeapotAsync(newTeapot);
                return Ok("Teapot has been added!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(string id, TeapotRequest updatedTeapot)
        {
            try
            {
                await _catalogItemService.UpdateTeapotAsync(id, updatedTeapot);
                return Ok("Teapot has been updated!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                await _catalogItemService.RemoveTeapotAsync(id);
                return Ok("Teapot has been deleted!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
