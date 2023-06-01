namespace Data;

public class PaginatedItems<T>
{
    public IEnumerable<T> Data { get; set; } = null!;

    public int TotalQuantity { get; set; }
}
