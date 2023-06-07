using Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Data.Configurations
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasKey(o => o.Id);
            builder.HasMany(o => o.Comments)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);
        }
    }
}