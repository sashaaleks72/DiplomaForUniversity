using Authorization.API.RequestModels;
using Authorization.API.ResponseModels;
using Authorization.API.Services;
using Authorization.API.Services.Abstractions;
using AutoMapper;
using Catalog.Host.Services.Abstractions;
using Data;
using Data.Entities;
using Infrastracture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Cryptography;

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
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<string>> Register(RegistrationModel userToRegister)
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

        [HttpPost, Authorize]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]

        public async Task<ActionResult<string>> RefreshToken()
        {
            var token = await _authService.RefreshToken();
            return Ok(token);
        }

        [HttpGet, Authorize]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType(typeof(ProfileResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ProfileResponseModel>> GetProfile()
        {
            var profile = await _authService.GetProfile();
            return Ok(profile);
        }
    }
}
