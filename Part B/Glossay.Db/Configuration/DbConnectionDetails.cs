using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Glossay.Db.Configuration
{
    public class DbConnectionDetails
    {
        public string Server { get; set; }
        public string Database { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public string ConnectionString => $"Server={Server};Initial Catalog={Database};Persist Security Info=False;User ID={Username};Password={Password};TrustServerCertificate=False";
    }
}
