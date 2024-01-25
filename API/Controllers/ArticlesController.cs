using Application.Articles;
using Azure.Core.Diagnostics;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class ArticlesController : BaseApiController
    {
        

        [HttpGet("{sources}")] //api/articles/count
        public async Task<ActionResult<Tuple<string, List<DomainArticle>>>> GetArticles(string sources, CancellationToken ct)
        {
            
            
           
            return await Mediator.Send(new List.Query{Sources = sources}, ct );
        }
        
        [Authorize]
        [HttpGet("sources")] //api/articles/sources
        public async Task<ActionResult<List<string>>> GetSources(CancellationToken ct)
        {
           
            return await Mediator.Send(new Sources.Query(), ct );
        }
    }
    
}