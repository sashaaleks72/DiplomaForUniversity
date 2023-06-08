namespace Chat.API.Models
{
    public class UserConnection
    {
        public Guid UserId { get; set; }
        public string UserFullName { get; set; } = string.Empty;
        public string? ConversationTopic { get; set; } = string.Empty;
        public Guid ChatId { get; set; } = Guid.Empty;
    }
}
