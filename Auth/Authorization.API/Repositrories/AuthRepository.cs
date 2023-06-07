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

        public async Task<UserEntity?> UpdateUserByEmail(string email, UserEntity updatedUser)
        {
            int quantityOfUpdatedRows = 0;
            var receivedUser = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
            
            if (receivedUser != null)
            {
                Type typeOfUserEntity = typeof(UserEntity);
                var properties = typeOfUserEntity.GetProperties();

                foreach (var property in properties)
                {
                    var updatedValue = property.GetValue(updatedUser);
                    var currentValue = property.GetValue(receivedUser);

                    if (updatedValue != null && !updatedValue.Equals(currentValue))
                    {
                        property.SetValue(currentValue, updatedValue);
                    }
                }

                quantityOfUpdatedRows = await _dbContext.SaveChangesAsync();
            }
            
            return quantityOfUpdatedRows > 0 ? receivedUser : null;
        }
    }
}
