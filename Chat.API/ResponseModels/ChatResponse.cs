namespace Chat.API.ResponseModels
{
    public class ChatResponse
    {
        public Guid Id { get; set; }

        public string ConversationTopic { get; set; } = string.Empty;
    }
}
