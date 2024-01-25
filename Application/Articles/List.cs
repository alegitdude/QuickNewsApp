using AutoMapper;
using MediatR;
using Domain;

using Microsoft.EntityFrameworkCore;
using Persistence.ScaffoldDbContext;
using Persistence.ScaffoldModels;
using Algolia;
using Algolia.Search.Clients;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;


namespace Application.Articles
{
    public class List
    {
        public class Query : IRequest<Tuple<string, List<DomainArticle>>>
        {
            public string Sources {get; set;}
        }
       

        public class Handler : IRequestHandler<Query, Tuple<string, List<DomainArticle>>>
        {
            private readonly NewsDbContext _context;
            private readonly IConfiguration _config;
            IMapper _mapper;

            public Handler(NewsDbContext context, IMapper mapper, IConfiguration config)
            {
                 _config = config;
                 _context = context;
                 _mapper = mapper;
            }
            public List<AlgoliaArticle> Convert(List<DomainArticle> someList)
            {
                List<AlgoliaArticle> algoliaArticles = new List<AlgoliaArticle>();
                foreach(DomainArticle anArticle in someList)
                {
                    var newArticle = new AlgoliaArticle
                    {
                    ObjectID= anArticle.Uuid,
                    Title = anArticle.Title,
                    Description = anArticle.Description,
                    Keywords = anArticle.Keywords,
                    Snippet = anArticle.Snippet,
                    Url = anArticle.Url,
                    ImageUrl = anArticle.ImageUrl,
                    Language = anArticle.Language,
                    PublishedAt = anArticle.PublishedAt,
                    Source = anArticle.Source,
                    Category1 = anArticle.Category1,
                    Category2 = anArticle.Category2,
                    RelevanceScore = anArticle.RelevanceScore,
                    Locale = anArticle.Locale,
                    TopStory = anArticle.TopStory,
                    };
                    algoliaArticles.Add(newArticle);
                };
                return algoliaArticles;
            }

            public async Task<Tuple<string, List<DomainArticle>>> Handle(Query request, CancellationToken cancellationToken)
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
               var adminKey = _config.GetConnectionString("AlgoliaAdmin");
               if(adminKey != null)
               {
                 ISearchClient client = new SearchClient("PG42VRDQ3Y", adminKey.ToString());
               SearchIndex index =  client.InitIndex("articles");
               var algoliaArticles = Convert(domainArticles);
               await index.SaveObjectsAsync(algoliaArticles);

               }else 
               {
                Console.WriteLine(adminKey);
               }
                var searchKey = _config.GetConnectionString("AlgoliaAdmin");
               Tuple<string, List<DomainArticle>> newTuple = new Tuple<string, List<DomainArticle>>(searchKey, domainArticles);
              

               

               return newTuple;
            }
        }
        
    }
}