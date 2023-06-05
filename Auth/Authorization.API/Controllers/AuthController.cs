using Authorization.API.RequestModels;
using Authorization.API.Services;
using Authorization.API.Services.Abstractions;
using AutoMapper;
using Catalog.Host.Services.Abstractions;
using Data;
using Data.Entities;
using Infrastracture;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Authorization.API.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService) 
        {
            _authService = authService;
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(UserEntity), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<UserEntity>> Register(RegistrationModel userToRegister)
        {
            await _authService.Register(userToRegister);
            return Ok("registered");
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<string>> Login(LoginModel credentials)
        {
            var token = await _authService.Login(credentials);
            return Ok(token);
        }
    }
}
