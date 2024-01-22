using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email {get; set;}

        [Required]
        [RegularExpression("(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must contain a lower and uppercase letter, a digit, and be between 4 and 8 characters and have a number")]
        public string Password {get; set;}
        [Required]
        public string Username {get; set;}

    }
}