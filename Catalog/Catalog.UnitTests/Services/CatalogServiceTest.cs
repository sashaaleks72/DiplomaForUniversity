namespace Catalog.UnitTests.Services
{
    public class CatalogServiceTest
    {
        private readonly ICatalogService _catalogService;

        private readonly Mock<ICatalogItemProvider> _catalogItemProvider;
        private readonly Mock<ICatalogCompanyProvider> _catalogCompanyProvider;
        private readonly Mock<ILogger<CatalogService>> _logger;
        private readonly Mock<IMapper> _mapper;
        private readonly Mock<IDbContextWrapper<ApplicationDbContext>> _dbContextWrapper;

        public CatalogServiceTest() 
        {
            _catalogItemProvider = new Mock<ICatalogItemProvider>();
            _catalogCompanyProvider = new Mock<ICatalogCompanyProvider>();
            _mapper = new Mock<IMapper>();
            _logger = new Mock<ILogger<CatalogService>>();
            _dbContextWrapper = new Mock<IDbContextWrapper<ApplicationDbContext>>();

            var dbContextTransaction = new Mock<IDbContextTransaction>();
            _dbContextWrapper.Setup(d => d.BeginTransaction(CancellationToken.None)).ReturnsAsync(dbContextTransaction.Object);

            _catalogService = new CatalogService(_catalogItemProvider.Object, _catalogCompanyProvider.Object, _mapper.Object, _logger.Object, _dbContextWrapper.Object);
        }

        [Fact]
        public async Task GetTeapotsAsync_DataIsNotEmpty_SuccessResponse()
        {
            //arrange
            int page = 1;
            int limit = 10;
            int total = 20;

            var paginatedItems = new PaginatedItems<TeapotEntity>
            {
                Data = new List<TeapotEntity>
                {
                    new TeapotEntity
                    {
                        Name = "Test"
                    }
                },
                TotalQuantity = total
            };

            var teapotsResponse = new List<TeapotResponse>
            {
                new TeapotResponse
                {
                    Name = "Test"
                }
            };
              

            _catalogItemProvider.Setup(c => c.GetTeapotsAsync(It.Is<int>(p => p == page), It.Is<int>(l => l == limit)))
                .ReturnsAsync(paginatedItems);

            _mapper.Setup(m => m.Map<List<TeapotResponse>>(It.IsAny<List<TeapotEntity>>()))
                .Returns(teapotsResponse);

            //act
            var result = await _catalogService.GetTeapotsAsync(page, limit);

            //assert
            result.Should().NotBeNull();
            result.Data.Should().NotBeNull();
            result.Data.Count().Should().BeGreaterThan(0);
            result.Limit.Should().Be(limit);
            result.Page.Should().Be(page);
            result.TotalQuantity.Should().Be(total);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Teapots have been recieved")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task GetTeapotsAsync_DataIsEmpty_ThrownException()
        {
            //arrange
            int page = 1;
            int limit = 10;

            var paginatedItems = new PaginatedItems<TeapotEntity>
            {
                Data = new List<TeapotEntity> { }
            };

            _catalogItemProvider.Setup(c => c.GetTeapotsAsync(It.Is<int>(p => p == page), It.Is<int>(l => l == limit)))
                .ReturnsAsync(paginatedItems);

            //act
            var action = async () =>
            {
                await _catalogService.GetTeapotsAsync(page, limit);
            };

            //assert
            await action.Should().ThrowAsync<Exception>().WithMessage("There are no any teapots in the list!");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Data list is empty!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task GetCompaniesAsync_CountNotZero_ReceivedCompanies()
        {
            //arrange
            var companies = new List<CompanyEntity>
            {
                new CompanyEntity {
                    Name = "Test"
                }
            };

            var companiesResponse = new List<CompanyResponse>
            {
                new CompanyResponse
                {
                    Name = "Test"
                }
            };

            _catalogCompanyProvider.Setup(c => c.GetCompanies()).ReturnsAsync(companies);
            _mapper.Setup(m => m.Map<List<CompanyResponse>>(It.Is<List<CompanyEntity>>(r => r.Equals(companies)))).Returns(companiesResponse);

            //act
            var result = await _catalogService.GetCompaniesAsync();

            //assert
            result.Should().NotBeNull();
            result.Count.Should().BePositive();

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals($"Companies have been recieved")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());

        }

        [Fact]
        public async Task GetCompaniesAsync_CountIsZero_ThrownException()
        {
            //arrange
            var companies = new List<CompanyEntity>();

            _catalogCompanyProvider.Setup(c => c.GetCompanies()).ReturnsAsync(companies);

            //act
            var act = async () =>
            {
                await _catalogService.GetCompaniesAsync();
            };

            //assert
            await act.Should().ThrowAsync<Exception>().WithMessage("There are no any companies!");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals($"Db is empty!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task GetTeapotByIdAsync_NotNull_ReceivedTeapot()
        {
            //arrange
            string id = Guid.NewGuid().ToString();

            var teapot = new TeapotEntity
            {
                Name = "Test"
            };

            var teapotResponse = new TeapotResponse
            {
                Name = "Test"
            };

            _catalogItemProvider.Setup(c => c.GetTeapotByIdAsync(It.Is<string>(i => i == id))).ReturnsAsync(teapot);
            _mapper.Setup(m => m.Map<TeapotResponse>(It.IsAny<TeapotEntity>())).Returns(teapotResponse);

            //act
            var result = await _catalogService.GetTeapotByIdAsync(id);

            //assert
            result.Should().NotBeNull();
            result.Should().BeOfType<TeapotResponse>();

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals($"Teapot has been recieved")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());

        }

        [Fact]
        public async Task GetTeapotByIdAsync_IsNull_ThrownException()
        {
            //arrange
            string id = Guid.NewGuid().ToString();
            TeapotEntity? teapot = null;

            _catalogItemProvider.Setup(c => c.GetTeapotByIdAsync(It.Is<string>(i => i == id))).ReturnsAsync(teapot);

            //act
            var act = async () =>
            {
                await _catalogService.GetTeapotByIdAsync(id);
            };

            //assert
            await act.Should().ThrowAsync<Exception>().WithMessage("There are no any teapot with input id!");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("There are no any teapot with input id!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());

        }

        [Fact]
        public async Task GetTeapotsByCompanyNameAsync_DataIsNotEmpty_SuccessResponse()
        {
            //arrange
            int page = 1;
            int limit = 10;
            int total = 20;
            string companyName = "test";

            var paginatedItems = new PaginatedItems<TeapotEntity>
            {
                Data = new List<TeapotEntity>
                {
                    new TeapotEntity
                    {
                        Name = "Test"
                    }
                },
                TotalQuantity = total
            };

            var teapotsResponse = new List<TeapotResponse>
            {
                new TeapotResponse
                {
                    Name = "Test"
                }
            };


            _catalogItemProvider.Setup(c => c.GetTeapotsByCompanyNameAsync(It.Is<string>(c => c == companyName), It.Is<int>(p => p == page), It.Is<int>(l => l == limit)))
                .ReturnsAsync(paginatedItems);

            _mapper.Setup(m => m.Map<List<TeapotResponse>>(It.IsAny<List<TeapotEntity>>()))
                .Returns(teapotsResponse);

            //act
            var result = await _catalogService.GetTeapotsByCompanyNameAsync(companyName, page, limit);

            //assert
            result.Should().NotBeNull();
            result.Data.Should().NotBeNull();
            result.Data.Count().Should().BePositive();
            result.Limit.Should().Be(limit);
            result.Page.Should().Be(page);
            result.TotalQuantity.Should().Be(total);

            _logger.Verify(l => l.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("Teapots have been recieved")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }

        [Fact]
        public async Task GetTeapotsByCompanyNameAsync_DataIsEmpty_ThrownException()
        {
            //arrange   
            int page = 1;
            int limit = 10;
            string companyName = "test";

            var paginatedItems = new PaginatedItems<TeapotEntity>
            {
                Data = new List<TeapotEntity> { }
            };

            _catalogItemProvider.Setup(c => c.GetTeapotsByCompanyNameAsync(It.Is<string>(c => c == companyName), It.Is<int>(p => p == page), It.Is<int>(l => l == limit)))
                .ReturnsAsync(paginatedItems);

            //act
            var action = async () =>
            {
                await _catalogService.GetTeapotsByCompanyNameAsync(companyName, page, limit);
            };

            //assert
            await action.Should().ThrowAsync<Exception>().WithMessage("There are no any teapots with input parameters' values!");

            _logger.Verify(l => l.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Equals("There are no any teapots with input parameters' values!")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
                Times.Once());
        }
    }
}
