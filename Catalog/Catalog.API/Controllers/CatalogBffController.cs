using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;
using Infrastracture;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Catalog.Host.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class CatalogBffController : ControllerBase
    {
        private readonly ICatalogService _catalogService;

        public CatalogBffController(ICatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(PaginatedItemsResponse<TeapotResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<PaginatedItemsResponse<TeapotResponse>>> Teapots([FromQuery] int page = 1, [FromQuery] int limit = 6)
        {
            try
            {
                var teapots = await _catalogService.GetTeapotsAsync(page, limit);
                return Ok(teapots);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(PaginatedItemsResponse<TeapotResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<PaginatedItemsResponse<TeapotResponse>>> TeapotsByCompanyName([FromQuery] string companyName, [FromQuery] int page = 1, [FromQuery] int limit = 6)
        {
            try
            {
                var teapots = await _catalogService.GetTeapotsByCompanyNameAsync(companyName, page, limit);
                return Ok(teapots);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(TeapotResponse), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<TeapotResponse>> Teapot([FromRoute] string id)
        {
            try
            {
                var teapot = await _catalogService.GetTeapotByIdAsync(id);
                return Ok(teapot);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(List<CompanyResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<List<CompanyResponse>>> Companies()
        {
            try
            {
                var companies = await _catalogService.GetCompaniesAsync();
                return Ok(companies);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
