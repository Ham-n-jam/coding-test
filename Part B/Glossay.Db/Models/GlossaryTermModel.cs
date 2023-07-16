using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Glossary.Db.Entities.Models
{
    [Table("GlossaryTerm")]
    public class GlossaryTermModel
    {
        [Key]
        public Guid Id { get; set; }
        public string Term { get; set; }
        public string Definition { get; set; }
    }
}
