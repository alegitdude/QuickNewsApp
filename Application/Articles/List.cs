using AutoMapper;
using MediatR;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.ScaffoldDbContext;
using Persistence.ScaffoldModels;


namespace Application.Articles
{
    public class List
    {
        public class Query : IRequest<List<DomainArticle>>
        {
            public string Sources {get; set;}
        }
       

        public class Handler : IRequestHandler<Query, List<DomainArticle>>
        {
            private readonly NewsDbContext _context;
            IMapper _mapper;

            public Handler(NewsDbContext context, IMapper mapper)
            {
                 _context = context;
                 _mapper = mapper;
            }
            public async Task<List<DomainArticle>> Handle(Query request, CancellationToken cancellationToken)
            {
                cancellationToken.ThrowIfCancellationRequested();
                var someSources = request.Sources;
                var dbList = await _context.Articles.Where(a=> someSources.IndexOf(a.Source) == -1 ).Take(1000).ToListAsync();

               List<DomainArticle> domainArticles = new List<DomainArticle>();
               foreach(Article article in dbList)
               {
                DomainArticle newArticle = new DomainArticle();
                  _mapper.Map(article, newArticle );
              
                domainArticles.Add(newArticle);
               }
               return domainArticles;
            }
        }
        
    }
}