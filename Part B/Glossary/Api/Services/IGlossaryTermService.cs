using Glossary.Api.Models;
using Glossary.Api.Models.Request;
using Glossary.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Glossary.Services
{
    public interface IGlossaryTermService
    {
        public Task<List<GlossaryTermDto>> GetAllGlossaryTerms();
        public Task<Guid> InsertGlossaryTerm(GlossaryTermInsertRequest request);
        public Task<bool> UpdateGlossaryTerm(GlossaryTermUpdateRequest request);
        public Task DeleteGlossaryTerm(Guid id);
    }
}
