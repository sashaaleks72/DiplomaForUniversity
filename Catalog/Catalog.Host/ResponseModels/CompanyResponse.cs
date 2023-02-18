namespace Catalog.Host.ResponseModels
{
    public class CompanyResponse
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string CountryOfRegistration { get; set; } = null!;
    }
}
