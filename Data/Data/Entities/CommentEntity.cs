namespace Data.Entities;

public class CommentEntity
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public string TeapotId { get; set; }
    public string Text { get; set; }
    public int Rate { get; set; }
    public string Advantages { get; set; }
    public string Disadvantags { get; set; }

    public virtual UserEntity User { get; set; }
    public virtual TeapotEntity Teapot { get; set; }
}