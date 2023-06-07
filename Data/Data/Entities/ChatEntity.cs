
namespace Data.Entities
{
    public class ChatEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string ConversationTopic { get; set; } = string.Empty;

        public virtual List<UserChatEntity> UserChats { get; set; } = null!;
    }
}
