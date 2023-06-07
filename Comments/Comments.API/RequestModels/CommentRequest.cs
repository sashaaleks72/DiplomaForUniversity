namespace Comments.API.RequestModels;

public class CommentRequest
{
    public Guid UserId { get; set; }

    public string TeapotId { get; set; } = string.Empty;

    public string CommentText { get; set; } = null!;

    public int Rate { get; set; }

    public string Advantages { get; set; } = null!;

    public string Disadvantags { get; set; } = null!;
}