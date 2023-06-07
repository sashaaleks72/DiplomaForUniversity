using Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Infrastructure.Filters
{
    public class HttpGlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<HttpGlobalExceptionFilter> _logger;

        public HttpGlobalExceptionFilter(ILogger<HttpGlobalExceptionFilter> logger) 
        {
            _logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            if (context.Exception is BusinessException ex) 
            {
                var details = new ValidationProblemDetails
                {
                    Instance = context.HttpContext.Request.Path,
                    Detail = ex.Message,
                    Status = StatusCodes.Status400BadRequest
                };

                context.Result = new BadRequestObjectResult(details);
                context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;

                context.ExceptionHandled = true;
            }
            else if (context.Exception is AuthorizationException authEx)
            {
                var details = new ValidationProblemDetails
                {
                    Instance = context.HttpContext.Request.Path,
                    Detail = authEx.Message,
                    Status = StatusCodes.Status401Unauthorized
                };

                context.Result = new UnauthorizedObjectResult(details);
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;

                context.ExceptionHandled = true;
            }
            else
            {
                _logger.LogError(new EventId(context.Exception.HResult), context.Exception, context.Exception.Message);
            }
        }
    }
}
