using Catalog.Host.RequestModels;
using Catalog.Host.Services.Abstractions;
using Infrastracture;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.Host.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class CatalogCompanyController : ControllerBase
    {
        private readonly ICatalogCompanyService _catalogCompanyService;

        public CatalogCompanyController(ICatalogCompanyService catalogCompanyService)
        {
            _catalogCompanyService = catalogCompanyService;
        }

        [HttpPost]
        public async Task<ActionResult> Add(CompanyRequest newCompany)
        {
            try
            {
                await _catalogCompanyService.AddCompanyAsync(newCompany);
                return Ok("Company has been added!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(int id, CompanyRequest updatedCompany)
        {
            try
            {
                await _catalogCompanyService.UpdateCompanyAsync(id, updatedCompany);
                return Ok("Company has been updated!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _catalogCompanyService.DeleteCompanyByIdAsync(id);
                return Ok("Company has been deleted!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
