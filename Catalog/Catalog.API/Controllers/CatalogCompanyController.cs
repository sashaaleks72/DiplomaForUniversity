using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;
using Infrastracture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net;

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
        [Authorize(Roles = "Admin")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> Add(CompanyRequest newCompany)
        {
            await _catalogCompanyService.AddCompanyAsync(newCompany);
            return Ok("Company has been added!");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> Edit(int id, CompanyRequest updatedCompany)
        {
            await _catalogCompanyService.UpdateCompanyAsync(id, updatedCompany);
            return Ok("Company has been updated!");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult> Delete(int id)
        {
            await _catalogCompanyService.DeleteCompanyByIdAsync(id);
            return Ok("Company has been deleted!");
        }
    }
}
