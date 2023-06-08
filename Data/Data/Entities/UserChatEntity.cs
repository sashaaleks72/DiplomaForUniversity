
namespace Data.Entities
{
    public class UserChatEntity
    {
        public int Id { get; set; }

        public string ConnectionId { get; set; } = string.Empty;

        public Guid ChatId { get; set; }
        public virtual ChatEntity Chat { get; set; } = null!;
        public Guid UserId {get; set;}
        public virtual UserEntity User { get; set; } = null!;
    }
}
