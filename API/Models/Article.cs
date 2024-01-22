using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Article 
    {
        [Key]
        public string Uuid { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Keywords { get; set; } = string.Empty;
        public string Snippet { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Image_Url { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public DateTime Published_At { get; set; } = DateTime.MinValue;
         public string Source { get; set; } = string.Empty;
        public string Category1 { get; set; } = string.Empty;
        public string Category2 { get; set; } = string.Empty;
        public double? Relevance_Score { get; set; } = null;
        public string Locale { get; set; } = string.Empty;
        public bool TopStory {get; set;}
    }
}