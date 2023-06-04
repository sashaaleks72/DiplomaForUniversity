namespace Authorization.API.RequestModels
{
    public class RegistrationModel
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Patronymic { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Gender { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;
    }
}
