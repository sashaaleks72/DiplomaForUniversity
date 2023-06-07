using System.Linq.Expressions;

namespace Modules.Test.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> OrderByParams<T>(this IQueryable<T> query, string sort, string order)
        {
            var parameter = Expression.Parameter(typeof(T), "t");

            if (!string.IsNullOrEmpty(sort)) 
            {
                sort = $"{sort[0].ToString().ToUpper()}{sort.Substring(1)}";
            }

            var property = sort == "-"
                    ? Expression.Property(parameter, "CreationDate")
                    : Expression.Property(parameter, sort);

            var objectProperty = Expression.TypeAs(property, typeof(object));
            var sortSelector = Expression.Lambda<Func<T, object>>(objectProperty, parameter);

            var orderedQuery = order == "asc" 
                ? query.OrderBy(sortSelector) 
                : order == "desc" 
                ? query.OrderByDescending(sortSelector) 
                : query;
            
            return orderedQuery;
        }
    }
}