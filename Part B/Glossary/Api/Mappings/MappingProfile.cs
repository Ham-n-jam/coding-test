using AutoMapper;
using Glossary.Api.Models;
using Glossary.Api.Models.Request;
using Glossary.Db.Entities.Models;
using Glossary.Models;

namespace Glossary
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GlossaryTermModel, GlossaryTermDto>().ReverseMap();
            CreateMap<GlossaryTermInsertRequest, GlossaryTermModel>();
            CreateMap<GlossaryTermUpdateRequest, GlossaryTermModel>();
        }
    }
}
