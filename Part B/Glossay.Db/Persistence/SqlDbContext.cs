using Glossary.Db.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Glossary.Db.Sql.Persistence
{
    public class SqlDbContext : DbContext
    {
        public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options)
        {
        }

        public DbSet<GlossaryTermModel> GlossaryTerms { get; set; }
    }
}
