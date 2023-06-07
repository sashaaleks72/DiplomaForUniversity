namespace Chat.API.Models
{
    public class UserConnection
    {
        public string UserId { get; set; } = string.Empty;
        public string UserFullName { get; set; } = string.Empty;
        public string? ConversationTopic { get; set; } = string.Empty;
        public string? ChatId { get; set; } = string.Empty;
    }
}
