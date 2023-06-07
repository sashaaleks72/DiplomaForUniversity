using Authorization.API.Repositrories.Abstractions;
using Authorization.API.RequestModels;
using Authorization.API.ResponseModels;
using Authorization.API.Services.Abstractions;
using AutoMapper;
using Data.Entities;
using Infrastructure.Exceptions;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Authorization.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _contextAccessor;

        public AuthService(IMapper mapper, IAuthRepository authRepository, IConfiguration configuration, IHttpContextAccessor contextAccessor)
        {
            _mapper = mapper;
            _authRepository = authRepository;
            _configuration = configuration;
            _contextAccessor = contextAccessor;
        }

        public async Task<ProfileResponseModel> UpdateUser(UpdateProfileModel userToUpdate) 
        {
            UserEntity? updatedUserToDb = null;

            var authorizedUserEmail = _contextAccessor.HttpContext!.User.Claims.SingleOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")!.Value;
            var receivedUser = await _authRepository.GetUserByEmail(authorizedUserEmail);

            if (receivedUser != null)
            {
                receivedUser.Birthday = DateTime.ParseExact(userToUpdate.Birthday, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                receivedUser.FirstName = userToUpdate.FirstName;
                receivedUser.LastName = userToUpdate.LastName;
                receivedUser.Patronymic = userToUpdate.Patronymic;

                updatedUserToDb = await _authRepository.UpdateUserByEmail(authorizedUserEmail, receivedUser);
            }

            if (updatedUserToDb == null)
            {
                throw new BusinessException("User hasn't been updated by some reason!");
            }

            var response = _mapper.Map<ProfileResponseModel>(updatedUserToDb);

            return response;
        }

        public async Task<ProfileResponseModel> GetProfile()
        {
            var authorizedUserEmail = _contextAccessor.HttpContext!.User.Claims.SingleOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")!.Value;
            var receivedUser = await _authRepository.GetUserByEmail(authorizedUserEmail);

            var profile = _mapper.Map<ProfileResponseModel>(receivedUser);

            return profile;
        }

        public async Task Register(RegistrationModel userToRegister)
        {
            var receivedUser = await _authRepository.GetUserByEmail(userToRegister.Email);

            if (receivedUser != null)
            {
                throw new BusinessException("User with input email already exists");
            }

            var user = _mapper.Map<UserEntity>(userToRegister);
            PasswordService.CreateHashedPassword(userToRegister.Password, out string hashedPassword, out string passwordSalt);

            user.HashedPassword = hashedPassword;
            user.PasswordSalt = passwordSalt;
            user.RoleId = 2;

            bool isAdded = await _authRepository.AddUser(user);

            if (!isAdded) 
            {
                throw new BusinessException("User hasn't been added by some reason");
            }
        }

        public async Task<string> Login(LoginModel credentials)
        {
            var receivedUser = await _authRepository.GetUserByEmail(credentials.Email);

            if (receivedUser == null)
            {
                throw new AuthorizationException("User with input email doesn't exist");
            }

            bool isVerified = PasswordService.VerifyHashedPassword(credentials.Password, receivedUser.HashedPassword, receivedUser.PasswordSalt);

            if (!isVerified) throw new AuthorizationException("Password is wrong");

            var token = CreateToken(receivedUser);

            var refreshToken = GenerateRefreshToken();
            await SetRefreshToken(refreshToken, receivedUser);

            return token;
        }

        public async Task<string> RefreshToken()
        {
            var refreshToken = _contextAccessor.HttpContext!.Request.Cookies["refreshToken"];
            var authorizedUserEmail = _contextAccessor.HttpContext.User.Claims.SingleOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")!.Value;
            var receivedUser = await _authRepository.GetUserByEmail(authorizedUserEmail);

            if (!receivedUser!.RefreshToken.Equals(refreshToken))
            {
                throw new AuthenticationException("Invalid Refresh Token");
            }
            else if (receivedUser.TokenExpires < DateTime.Now)
            {
                throw new AuthenticationException("Token expired.");
            }

            string token = CreateToken(receivedUser);

            var newRefreshToken = GenerateRefreshToken();
            await SetRefreshToken(newRefreshToken, receivedUser);

            return token;
        }

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private async Task SetRefreshToken(RefreshToken newRefreshToken, UserEntity user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            _contextAccessor.HttpContext!.Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;

            await _authRepository.UpdateUserByEmail(user.Email, user);
        }

        private string CreateToken(UserEntity user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.Name)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AuthorizationConfigs:SecretKey").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
