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
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(PaginatedItemsResponse<TeapotResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<PaginatedItemsResponse<TeapotResponse>>> Teapots(string sort = "-", string order = "-", int page = 1, int limit = 6)
        {
            var teapots = await _catalogService.GetTeapotsAsync(sort, order, page, limit);
            return Ok(teapots);
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(PaginatedItemsResponse<TeapotResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<PaginatedItemsResponse<TeapotResponse>>> TeapotsByCompanyName([FromQuery] string companyName, [FromQuery] int page = 1, [FromQuery] int limit = 6)
        {
            var teapots = await _catalogService.GetTeapotsByCompanyNameAsync(companyName, page, limit);
            return Ok(teapots);
        }

        [HttpGet("{id}")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(TeapotResponse), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<TeapotResponse>> Teapot([FromRoute] string id)
        {
            var teapot = await _catalogService.GetTeapotByIdAsync(id);
            return Ok(teapot);
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(List<CompanyResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<List<CompanyResponse>>> Companies()
        {
            var companies = await _catalogService.GetCompaniesAsync();
            return Ok(companies);
        }
    }
}
