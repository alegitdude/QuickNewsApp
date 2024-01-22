using AutoMapper;
using MediatR;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.ScaffoldDbContext;
using Persistence.ScaffoldModels;

namespace Application.Articles
{
    public class Sources
    {
        public class Query : IRequest<List<string>>
        {

        }

        public class Handler : IRequestHandler<Query, List<string>>
        {
            private readonly NewsDbContext _context;
            public Handler(NewsDbContext context)
            {
                _context = context;
            }
            public async Task<List<string>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Articles.Select((t) => t.Source).Distinct().ToListAsync();
            }
        }

    }
}