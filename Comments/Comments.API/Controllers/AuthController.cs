using Infrastracture;
using Microsoft.AspNetCore.Mvc;

namespace Authorization.API.Controllers
{
    [Route(ComponentDefaults.DefaultRoute)]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration) 
        {
            _configuration = configuration;
        }

        public void Register()
        {

        }

        public void Login()
        {

        }
    }
}
