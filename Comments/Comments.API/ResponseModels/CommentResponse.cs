namespace Comments.API.ResponseModels;

public class CommentResponse
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public string TeapotId { get; set; }
    public string Text { get; set; } = null!;
    public int Rate { get; set; }
    public string Advantages { get; set; } = null!;
    public string Disadvantags { get; set; } = null!;
    
    public string UserFirstName { get; set; } = null!;
    public string UserLastName { get; set; } = null!;
    public string UserGender { get; set; } = null!;
}