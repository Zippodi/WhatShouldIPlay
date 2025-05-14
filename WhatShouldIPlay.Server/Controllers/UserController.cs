using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using WhatShouldIPlay.Server.Models;
using WhatShouldIPlay.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace WhatShouldIPlay.Server.Controllers
{
    //Contains endpoints for getting, creating and editing users from the database.
    //There is no passwords because all information is public.
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        //Constructs the controller with the database context
        public UserController(ApplicationDbContext context)
        {
            this.context = context;

        }



        //Retrieves the current user with the given username
        [HttpGet("currentuser/{username}")]
        public ActionResult<UserModel> GetCurrentUser(string username)
        {
            var user = context.Users.FirstOrDefault(i => i.Username == username);
            if (user == null)
                return NotFound();

            return Ok(user);
        }


        //Registers the given user in the database
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserModel newUser)
        {
            if (string.IsNullOrWhiteSpace(newUser.Username))
                return BadRequest("Username is required.");

            // Optional: Check for duplicates
            var existingUser = await context.Users
                .FirstOrDefaultAsync(u => u.Username == newUser.Username);

            if (existingUser != null)
                return Conflict("A user with that username already exists.");



            // Add and save the new user
            context.Users.Add(newUser);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurrentUser), new { username = newUser.Username }, newUser);
        }


        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("Backend is alive and CORS is working!");
        }

        //Updates the User with the steamID
        [HttpPut("addSteam")]
        public async Task<IActionResult> AddSteamID([FromBody] UserModel newUser)
        {
            if (string.IsNullOrWhiteSpace(newUser.Username))
                return BadRequest("Username is required.");

            if (string.IsNullOrWhiteSpace(newUser.SteamID))
                return BadRequest("Steam ID is required.");

            if (newUser.SteamID.Length != 17)
                return BadRequest("Steam ID is invalid.");

            var existingUser = await context.Users
                .FirstOrDefaultAsync(u => u.Username == newUser.Username);

            if (existingUser == null)
                return NotFound($"User '{newUser.Username}' not found.");

            // Update the Steam ID
            existingUser.SteamID = newUser.SteamID;


            await context.SaveChangesAsync();

            return Ok(existingUser);

        }

        //Updates the user with the given MarvelRivals username
        [HttpPut("addMarvelRivalsUsername")]
        public async Task<IActionResult> AddMarvelRivalsUsername([FromBody] UserModel newUser)
        {
            if (string.IsNullOrWhiteSpace(newUser.Username))
                return BadRequest("Username is required.");

            if (string.IsNullOrWhiteSpace(newUser.MarvelRivalsUsername))
                return BadRequest("Marvel Rivals username is required.");

            var existingUser = await context.Users
                .FirstOrDefaultAsync(u => u.Username == newUser.Username);

            if (existingUser == null)
                return NotFound($"User '{newUser.Username}' not found.");

            // Update the Steam ID
            existingUser.MarvelRivalsUsername = newUser.MarvelRivalsUsername;


            await context.SaveChangesAsync();

            return Ok(existingUser);

        }

        //Updates the user's marvel rivals access time
        [HttpPut("updateAccessTime/{username}")]
        public async Task<IActionResult> updateAccessTime(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return BadRequest("Username is required.");

          
            var existingUser = await context.Users
                .FirstOrDefaultAsync(u => u.Username == username);

            if (existingUser == null)
                return NotFound($"User '{username}' not found.");

            existingUser.MarvelRivalsAccessTime = DateTime.UtcNow;


            await context.SaveChangesAsync();

            return Ok(existingUser);

        }
    }
}
