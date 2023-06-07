namespace Authorization.API.ResponseModels
{
    public class ProfileResponseModel
    {
        public Guid UserId { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Patronymic { get; set; } = string.Empty;

        public string Birthday { get; set; } = string.Empty;
    }
}