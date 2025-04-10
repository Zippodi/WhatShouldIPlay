using Microsoft.AspNetCore.Mvc;
using WhatShouldIPlay.Server.Models;
using WhatShouldIPlay.Server.Services;

namespace WhatShouldIPlay.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HeroController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public HeroController(ApplicationDbContext context)
        {
            this.context = context;
        }




        [HttpGet("role/{role}")]
        public HeroModel[] GetHeroesByRole(string role)
        {
            HeroModel[] heroes = context.Heroes.Where(i => i.Role == role).ToArray();
            return heroes;
        }

        [HttpGet("playstyle/{playstyle}")]
        public HeroModel[] GetHeroesByPlaystyle(string playstyle)
        {
            //HeroModel[] heroes = context.Heroes.Where(i => i.Playstyles.Contains(playstyle)).ToArray();
            //return heroes;
            HeroModel[] heroes = context.Heroes.ToArray();

            // Filter heroes by playstyle using the deserialized PlaystylesArray property
            var filteredHeroes = heroes.Where(hero => hero.Playstyles.Contains(playstyle.Trim())).ToArray();

            return filteredHeroes;
        }

        [HttpGet("favorite")]
        public HeroModel[] GetFavoriteHeroes()
        {
            HeroModel[] heroes = context.Heroes.Where(i => i.IsFavorite).ToArray();
            return heroes;
        }

        [HttpGet("Wolverine")]
        public HeroModel GetWolverine()
        {
            int id = 30;
            HeroModel wolverine = context.Heroes.Find(id);
            if (wolverine == null)
            {
                return null;
            }
            return wolverine;
        }

        [HttpGet]
        public HeroModel[] GetAllHeroes()
        {
            return context.Heroes.ToArray(); // Returns the entire list of heroes
        }
    }
}
