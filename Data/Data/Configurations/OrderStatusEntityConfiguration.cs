using Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Data.Configurations
{
    public class OrderStatusEntityConfiguration : IEntityTypeConfiguration<OrderStatusEntity>
    {
        public void Configure(EntityTypeBuilder<OrderStatusEntity> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).ValueGeneratedOnAdd();
        }
    }
}
