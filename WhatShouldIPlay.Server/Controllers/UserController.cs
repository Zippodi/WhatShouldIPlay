using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using WhatShouldIPlay.Server.Models;
using WhatShouldIPlay.Server.Services;

namespace WhatShouldIPlay.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext context;
       

        public UserController(ApplicationDbContext context)
        {
            this.context = context;
 
        }




        //[HttpGet("currentuser/{username}")]
        //public HeroModel[] GetHeroesByRole(string username)
        //{
        //    HeroModel[] heroes = context.Users.Where(i => i.Username == username).ToArray();
        //    return heroes;
        //}

        
    }

}
