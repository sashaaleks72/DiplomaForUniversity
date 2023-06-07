using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class UserChatEntityConfiguration : IEntityTypeConfiguration<UserChatEntity>
    {
        public void Configure(EntityTypeBuilder<UserChatEntity> builder)
        {
            builder.HasKey(uc => uc.Id);
            builder.Property(uc => uc.Id).ValueGeneratedOnAdd();
        }
    }
}
