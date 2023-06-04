using Authorization.API.RequestModels;
using Data.Entities;
using Infrastructure.Exceptions;

namespace Authorization.API.Services.Abstractions
{
    public interface IAuthService
    {
        public Task Register(RegistrationModel userToRegister);

        public Task<string> Login(LoginModel credentials);
    }
}
