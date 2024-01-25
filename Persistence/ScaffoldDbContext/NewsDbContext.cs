using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.VisualBasic;
using Persistence.ScaffoldModels;

namespace Persistence.ScaffoldDbContext;


public partial class NewsDbContext : IdentityDbContext<AppUser>
{
    private readonly IConfiguration _config;
    public NewsDbContext(DbContextOptions<NewsDbContext> options, IConfiguration config)
        : base(options)
    {
        _config = config;
    }
   
   

    public virtual DbSet<Article> Articles { get; set; }
     

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("SqlDbPass"));
            
        }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasKey(e => e.Uuid);

            entity.ToTable("Articles", "NewsDb");

            entity.Property(e => e.Uuid).HasMaxLength(100);
            entity.Property(e => e.Category1)
                .IsRequired()
                .HasMaxLength(20);
            entity.Property(e => e.Category2).HasMaxLength(20);
            entity.Property(e => e.Description)
                .IsRequired()
                .HasMaxLength(1000);
            entity.Property(e => e.ImageUrl)
                .IsRequired()
                .HasMaxLength(1000)
                .HasColumnName("Image_Url");
            entity.Property(e => e.Keywords)
                .HasMaxLength(4000)
                .IsUnicode(false);
            entity.Property(e => e.Language)
                .IsRequired()
                .HasMaxLength(20);
            entity.Property(e => e.Locale)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.PublishedAt).HasColumnName("Published_At");
            entity.Property(e => e.RelevanceScore).HasColumnName("Relevance_Score");
            entity.Property(e => e.Snippet)
                .IsRequired()
                .HasMaxLength(3000);
            entity.Property(e => e.Source)
                .IsRequired()
                .HasMaxLength(1000);
            entity.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(300);
            entity.Property(e => e.TopStory).HasDefaultValueSql("('TRUE')");
            entity.Property(e => e.Url)
                .IsRequired()
                .HasMaxLength(1000);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
