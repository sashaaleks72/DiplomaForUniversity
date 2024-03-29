﻿using Catalog.Host.Providers.Abstractions;
using Catalog.Host.Services.Abstractions;
using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Host.Providers
{
    public class CatalogCompanyProvider : ICatalogCompanyProvider
    {
        private readonly ApplicationDbContext _dbContext;

        public CatalogCompanyProvider(IDbContextWrapper<ApplicationDbContext> dbContextWrapper) 
        {
            _dbContext = dbContextWrapper.DbContext;
        }

        public async Task<bool> AddCompanyAsync(CompanyEntity companyEntity)
        {
            await _dbContext.Companies.AddAsync(companyEntity);
            int quantityOfAddedEntries = await _dbContext.SaveChangesAsync();

            return quantityOfAddedEntries > 0;
        }

        public async Task<bool> UpdateCompanyAsync(CompanyEntity changedCompany)
        {
            _dbContext.Companies.Update(changedCompany);
            int quantityOfUpdatedEntries = await _dbContext.SaveChangesAsync();

            return quantityOfUpdatedEntries > 0;
        }

        public async Task<bool> DeleteCompanyByIdAsync(CompanyEntity companyToDelete)
        {
            _dbContext.Companies.Remove(companyToDelete);
            int quantityOfDeletedEntries = await _dbContext.SaveChangesAsync();

            return quantityOfDeletedEntries > 0;
        }

        public async Task<List<CompanyEntity>> GetCompanies()
        {
            var companies = await _dbContext.Companies.ToListAsync();

            return companies;
        }
    }
}
