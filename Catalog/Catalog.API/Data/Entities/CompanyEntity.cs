namespace Catalog.Host.Data.Entities
{
    public class CompanyEntity
    {
        public int Id { get; set; } 

        public string Name { get; set; } = null!;

        public string CountryOfRegistration { get; set; } = null!;
    }
}
