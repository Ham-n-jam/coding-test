using Glossary.Db.Entities.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Glossary.Db.Entities.Repositories
{
    public interface IGlossaryTermRepository
    {
        Task<List<GlossaryTermModel>> GetAll();

        public Task<Guid> Insert(GlossaryTermModel model);

        public Task<bool> Update(GlossaryTermModel model);

        public Task Delete(Guid id);

        public Task Save();
    }
}
