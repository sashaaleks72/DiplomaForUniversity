using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Authorization.API.Repositrories.Abstractions
{
    public interface IAuthRepository
    {
        public Task<bool> AddUser(UserEntity user);
        public Task<UserEntity?> GetUserByEmail(string email);
        public Task<bool> UpdateUserByEmail(string email, UserEntity updatedUser);
    }
}
