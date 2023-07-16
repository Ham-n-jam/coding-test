using System;

namespace Glossary.Models
{
    public class GlossaryTermDto
    {
        public Guid Id { get; set; }
        public string Term { get; set; }
        public string Definition { get; set; }
    }
}
