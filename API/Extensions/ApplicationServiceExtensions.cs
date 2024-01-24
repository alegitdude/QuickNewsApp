using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Articles;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence.ScaffoldDbContext;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();

            services.AddDbContext<NewsDbContext>(opt =>
            {
                 opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            } );
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                 policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("/");

                } );
            });
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;

        }
    }
}