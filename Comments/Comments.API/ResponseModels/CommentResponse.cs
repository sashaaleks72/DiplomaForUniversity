namespace Comments.API.ResponseModels;

public class CommentResponse
{
    public int Id { get; set; }

    public string UserFullName { get; set; } = null!;

    public string CommentText { get; set; } = null!;

    public int Rate { get; set; }

    public string Advantages { get; set; } = null!;

    public string Disadvantags { get; set; } = null!;
}