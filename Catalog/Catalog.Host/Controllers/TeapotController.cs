using Catalog.Host.RequestModels;
using Catalog.Host.ResponseModels;
using Catalog.Host.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.Host.Controllers
{
    [Route("api/teapots")]
    [ApiController]
    public class TeapotController : ControllerBase
    {
        private readonly ITeapotService _teapotService;

        public TeapotController(ITeapotService teapotService) 
        { 
            _teapotService = teapotService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TeapotResponse>>> GetAll()
        {
            try
            {
                var teapots = await _teapotService.GetAllTeapotsAsync();
                return Ok(teapots);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeapotResponse>> GetById(string id)
        {
            try
            {
                var teapot = await _teapotService.GetTeapotByIdAsync(id);
                return Ok(teapot);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Add(TeapotRequest newTeapot)
        {
            try
            {
                await _teapotService.AddTeapotAsync(newTeapot);
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
                await _teapotService.UpdateTeapotAsync(id, updatedTeapot);
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
                await _teapotService.RemoveTeapotAsync(id);
                return Ok("Teapot has been deleted!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
