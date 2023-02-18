using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;
using Infrastracture;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<List<TeapotResponse>>> Teapots()
        {
            try
            {
                var teapots = await _catalogService.GetAllTeapotsAsync();
                return Ok(teapots);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<TeapotResponse>>> TeapotsByCompanyName(string companyName)
        {
            try
            {
                var teapots = await _catalogService.GetTeapotsByCompanyNameAsync(companyName);
                return Ok(teapots);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeapotResponse>> Teapot(string id)
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
