using Authorization.API.Repositrories.Abstractions;
using Authorization.API.RequestModels;
using Authorization.API.Services.Abstractions;
using AutoMapper;
using Data.Entities;
using Infrastructure.Exceptions;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

namespace Authorization.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IMapper mapper, IAuthRepository authRepository, IConfiguration configuration)
        {
            _mapper = mapper;
            _authRepository = authRepository;
            _configuration = configuration;
        }

        public async Task Register(RegistrationModel userToRegister)
        {
            var receivedUser = await _authRepository.GetUserByEmail(userToRegister.Email);

            if (receivedUser != null)
            {
                new BusinessException("User with input email already exists");
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

            var token = CreateToken(credentials);
            return token;
        }

        private string CreateToken(LoginModel credentials)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, credentials.Email),
                // new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AuthorizationConfigs:SecretKey").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
