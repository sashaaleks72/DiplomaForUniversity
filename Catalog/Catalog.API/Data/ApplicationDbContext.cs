using Catalog.Host.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Host.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<TeapotEntity> Teapots { get; set; } = null!;
        public DbSet<CompanyEntity> Companies { get; set; } = null!;
        public DbSet<OrderEntity> Orders { get; set; } = null!;
        public DbSet<OrderProductEntity> OrderItems { get; set; } = null!;
        public DbSet<OrderStatusEntity> OrderStatuses { get; set; } = null!;
        public DbSet<RoleEntity> Roles { get; set; } = null!;
        public DbSet<UserEntity> Users { get; set; } = null!;
        

        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.UseHiLo();
        }
    }
}
