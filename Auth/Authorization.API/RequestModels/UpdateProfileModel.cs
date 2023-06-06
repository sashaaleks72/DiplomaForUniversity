namespace Authorization.API.RequestModels
{
    public class UpdateProfileModel
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Patronymic { get; set; } = null!;

        public string Birthday { get; set; } = null!;
    }
}
