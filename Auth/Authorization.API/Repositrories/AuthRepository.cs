using Authorization.API.Repositrories.Abstractions;
using Catalog.Host.Services.Abstractions;
using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Authorization.API.Repositrories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public AuthRepository(IDbContextWrapper<ApplicationDbContext> dbContextWrapper) 
        {
            _dbContext = dbContextWrapper.DbContext;
        }

        public async Task<bool> AddUser(UserEntity user)
        {
            await _dbContext.Users.AddAsync(user);
            int quantityOfSavedRows = await _dbContext.SaveChangesAsync();

            return quantityOfSavedRows > 0;
        }

        public async Task<UserEntity?> GetUserByEmail(string email)
        {
            var receivedUser = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
            return receivedUser;
        }
    }
}
