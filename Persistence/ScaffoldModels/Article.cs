namespace Persistence.ScaffoldModels;

public partial class Article
{
    public string Uuid { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public string Keywords { get; set; }

    public string Snippet { get; set; }

    public string Url { get; set; }

    public string ImageUrl { get; set; }

    public string Language { get; set; }

    public DateTime PublishedAt { get; set; }

    public string Source { get; set; }

    public string Category1 { get; set; }

    public string Category2 { get; set; }

    public double? RelevanceScore { get; set; }

    public string Locale { get; set; }

    public bool TopStory { get; set; }
}
