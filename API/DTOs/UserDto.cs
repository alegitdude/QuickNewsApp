namespace API.DTOs
{
    public class UserDto
    {
        public string Token {get; set;}
        public List<string> OmittedSources {get; set;}
        public string Username {get; set;}
    }
}