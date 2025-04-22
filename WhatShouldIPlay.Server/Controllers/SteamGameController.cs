using Microsoft.AspNetCore.Mvc;
using WhatShouldIPlay.Server.Models;
using WhatShouldIPlay.Server.Services;

namespace WhatShouldIPlay.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SteamGameController : ControllerBase
    {
        private readonly ApplicationDbContext context;


        public SteamGameController(ApplicationDbContext context)
        {
            this.context = context;

        }




        [HttpGet("role/{role}")]
        public HeroModel[] GetHeroesByRole(string role)
        {
            HeroModel[] heroes = context.Heroes.Where(i => i.Role == role).ToArray();
            return heroes;
        }


    }
}
