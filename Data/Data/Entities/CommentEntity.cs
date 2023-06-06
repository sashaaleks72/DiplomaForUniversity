namespace Data.Entities;

public class CommentEntity
{
    public int Id { get; set; }
    
    public string CommentText { get; set; } = string.Empty;
    public int Rate { get; set; }
    public string Advantages { get; set; } = string.Empty;
    public string Disadvantags { get; set; } = string.Empty;

    public Guid UserId { get; set; }
    public virtual UserEntity User { get; set; } = null!;
    public string TeapotId { get; set; } = string.Empty;
    public virtual TeapotEntity Teapot { get; set; } = null!;
}