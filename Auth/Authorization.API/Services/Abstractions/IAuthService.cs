using Authorization.API.RequestModels;
using Authorization.API.ResponseModels;

namespace Authorization.API.Services.Abstractions
{
    public interface IAuthService
    {
        public Task Register(RegistrationModel userToRegister);

        public Task<ProfileResponseModel> UpdateUser(UpdateProfileModel userToUpdate);

        public Task<string> Login(LoginModel credentials);

        public Task<string> RefreshToken();

        public Task<ProfileResponseModel> GetProfile();
    }
}
