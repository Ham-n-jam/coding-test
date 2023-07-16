using AutoMapper;
using Glossary.Api.Models;
using Glossary.Api.Models.Request;
using Glossary.Db.Entities.Models;
using Glossary.Db.Entities.Repositories;
using Glossary.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Glossary.Services
{
    public class GlossaryTermService : IGlossaryTermService
    {
        private readonly IGlossaryTermRepository _glossaryTermRepository;
        private readonly IMapper _mapper;

        public GlossaryTermService(
            IGlossaryTermRepository glossaryTermRepository,
            IMapper mapper)
        {
            _glossaryTermRepository = glossaryTermRepository;
            _mapper = mapper;
        }

        public async Task<List<GlossaryTermDto>> GetAllGlossaryTerms()
        {
            var glossaryTermModels = await _glossaryTermRepository.GetAll();

            return _mapper.Map<List<GlossaryTermDto>>(glossaryTermModels);
        }

        public async Task<Guid> InsertGlossaryTerm(GlossaryTermInsertRequest request)
        {
            var glossaryTermModel = _mapper.Map<GlossaryTermModel>(request);
            
            var guid = Guid.NewGuid();
            glossaryTermModel.Id = guid;

            await _glossaryTermRepository.Insert(glossaryTermModel);
            await _glossaryTermRepository.Save();

            return guid;
        }

        public async Task<bool> UpdateGlossaryTerm(GlossaryTermUpdateRequest request)
        {
            var glossaryTermModel = _mapper.Map<GlossaryTermModel>(request);
            var success = await _glossaryTermRepository.Update(glossaryTermModel);
            await _glossaryTermRepository.Save();

            return success;
        }

        public async Task DeleteGlossaryTerm(Guid id)
        {
            await _glossaryTermRepository.Delete(id);
            await _glossaryTermRepository.Save();
        }
    }
}
