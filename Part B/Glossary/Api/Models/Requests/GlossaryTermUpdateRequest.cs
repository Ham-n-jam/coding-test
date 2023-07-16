using System;

namespace Glossary.Api.Models.Request
{
    public class GlossaryTermUpdateRequest
    {
        public Guid Id { get; set; }
        public string Term { get; set; }
        public string Definition { get; set; }
    }
}
