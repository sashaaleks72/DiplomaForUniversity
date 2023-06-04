using Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Data.Configurations
{
    public class TeapotEntityConfiguration : IEntityTypeConfiguration<TeapotEntity>
    {
        public void Configure(EntityTypeBuilder<TeapotEntity> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id).ValueGeneratedOnAdd();
        }
    }
}
