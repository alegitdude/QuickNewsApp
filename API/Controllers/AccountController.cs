using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _config;
        public AccountController(UserManager<AppUser>userManager, TokenService tokenService, IConfiguration config)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _config = config;

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if(result)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        } 

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username is already taken");
            }

            if(await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email is already taken");
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,

            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            

            return  CreateUserObject(user);
           
        }

        [Authorize]
        [HttpPut("{aSource}")]
        public async Task<ActionResult<bool>> EditOmittedSources(string aSource)
        {
            Console.WriteLine(aSource);
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            Console.WriteLine(user.OmittedSources);

            int theIndex = user.OmittedSources.IndexOf(aSource);

            Console.WriteLine(theIndex );
            string updatedSources = "";
            if(theIndex == -1 || theIndex == 0)
            {
                updatedSources = user.OmittedSources + aSource + ",";

            }
           
            if(theIndex != -1)
            {
               updatedSources = user.OmittedSources.Remove(theIndex, aSource.Length + 1);
            }
            
            user.OmittedSources = updatedSources;
            await _userManager.UpdateAsync(user);
            
             return true;
        }

          public class UserResponse
    {
       public UserResponse(UserDto user, string algoliaSearch)
       {
        User = user;
        AlgoliaSearch = algoliaSearch;
       }

       public UserDto User {get; set;}
       public string AlgoliaSearch {get; set;}
    }



        public UserDto CreateUserObject(AppUser user)
        {
            List<string> someSources = new List<string>();
            if(user.OmittedSources != null){
                 someSources = user.OmittedSources.Trim().Split(',').ToList();
            someSources.Remove("");
            }
           
            return new UserDto
            {
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                OmittedSources = someSources
            };
        }

    }
}