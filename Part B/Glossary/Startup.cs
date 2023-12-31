using AutoMapper;
using Glossary.Db.Entities.Repositories;
using Glossary.Db.Sql.Persistence;
using Glossary.Db.Sql.Repositories;
using Glossary.Services;
using Glossay.Db.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Glossary
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddScoped<IGlossaryTermRepository, GlossaryTermRepository>();
            services.AddScoped<IGlossaryTermService, GlossaryTermService>();

            // Automapper config setup
            var mapperConfig = new MapperConfiguration(config =>
            {
                config.AddProfile(new MappingProfile());
            });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            var dbConnectionDetails = new DbConnectionDetails();
            Configuration.GetSection(nameof(DbConnectionDetails)).Bind(dbConnectionDetails);
            services.AddDbContext<SqlDbContext>(options => options.UseSqlServer(dbConnectionDetails.ConnectionString));

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "Frontend/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "Frontend";

                if (env.IsDevelopment())
                {
                    // SPA frontend docker container proxy
                    spa.UseProxyToSpaDevelopmentServer("http://glossary.ng.frontend:4200");
                }
            });

            if (env.IsDevelopment())
            {
                using (var scope = app.ApplicationServices.CreateScope())
                {
                    var sqlDbContext = scope.ServiceProvider.GetRequiredService<SqlDbContext>();
                    sqlDbContext.Database.EnsureCreated();
                }
            }

        }
    }
}
