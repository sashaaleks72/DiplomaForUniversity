namespace Catalog.Host.ResponseModels
{
    public class PaginatedItemsResponse<T>
    {
        public IEnumerable<T> Data { get; set;} = null!;

        public int Page { get; set; }

        public int Limit { get; set; }

        public int TotalQuantity { get; set; }
    }
}
