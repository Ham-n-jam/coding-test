using Glossary.Db.Entities.Models;
using Glossary.Db.Entities.Repositories;
using Glossary.Db.Sql.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Glossary.Db.Sql.Repositories
{
    public class GlossaryTermRepository : IGlossaryTermRepository
    {
        private readonly SqlDbContext _dbContext;

        public GlossaryTermRepository(SqlDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<List<GlossaryTermModel>> GetAll()
        {
            return _dbContext.GlossaryTerms.AsNoTracking().OrderBy(gt => gt.Term).ToListAsync();
        }

        public async Task<Guid> Insert(GlossaryTermModel model)
        {
            await _dbContext.GlossaryTerms.AddAsync(model);

            return model.Id;
        }

        public async Task<bool> Update(GlossaryTermModel model)
        {
            
            var glossaryTerm = await _dbContext.GlossaryTerms.FindAsync(model.Id);
            if (glossaryTerm != null)
            {
                _dbContext.Entry(glossaryTerm).CurrentValues.SetValues(model);
                return true;
            }

            return false;
        }

        public async Task Delete(Guid id)
        {
            var glossaryTerm = await _dbContext.GlossaryTerms.FindAsync(id);
            if (glossaryTerm != null)
            {
                _dbContext.GlossaryTerms.Remove(glossaryTerm);
            }
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
