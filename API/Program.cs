using API.Extensions;
using Application.Articles;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.Entities;
using Persistence;
using Persistence.ScaffoldDbContext;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("CorsPolicy");
app.UseReferrerPolicy(opt => opt.NoReferrer());
app.UseXXssProtection(opt=> opt.EnabledWithBlockMode());
app.UseXfo(opt => opt.Deny());


app.UseXContentTypeOptions();
app.UseCsp(opt => opt
    .BlockAllMixedContent()
    .FormActions(s => s.Self())
    .FrameAncestors(s => s.Self())
    .ScriptSources(s => s.Self())
);


if(app.Environment.IsProduction())
{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age-31536000" );
        await next.Invoke();
    });
}
app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");


using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;



app.Run();
