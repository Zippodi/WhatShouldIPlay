using Microsoft.AspNetCore.Mvc;
using WhatShouldIPlay.Server.Models;

namespace WhatShouldIPlay.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HeroController : ControllerBase
    {
        private static readonly IEnumerable<HeroModel> Heroes = new[] {
    new HeroModel { Name="Captain America", Id=1, Playstyles = [ "dive", "peel" ], Role="Vanguard", ImageId=1, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Doctor Strange", Id=2, Playstyles = [ "shield", "poke" ], Role="Vanguard", ImageId=2, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Emma Frost", Id=3, Playstyles = [ "pressure", "control" ], Role="Vanguard", ImageId=3, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Groot", Id=4, Playstyles = [ "shield", "control" ], Role="Vanguard", ImageId=4, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Hulk", Id=5, Playstyles = [ "dive", "peel" ], Role="Vanguard", ImageId=5, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Magneto", Id=6, Playstyles = [ "shield", "poke" ], Role="Vanguard", ImageId=6, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Peni Parker", Id=7, Playstyles = [ "control" ], Role="Vanguard", ImageId=7, IsFavorite=false, Rank=0 },
    new HeroModel { Name="The Thing", Id=8, Playstyles = [ "dive", "peel" ], Role="Vanguard", ImageId=8, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Thor", Id=9, Playstyles = [ "pressure", "peel" ], Role="Vanguard", ImageId=9, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Venom", Id=10, Playstyles = [ "dive", "pressure" ], Role="Vanguard", ImageId=10, IsFavorite=false, Rank=0 },

    new HeroModel { Name="Black Panther", Id=11, Playstyles = [ "dive", "peel", "flank" ], Role="Duelist", ImageId=11, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Black Widow", Id=12, Playstyles = [ "poke", "sniper" ], Role="Duelist", ImageId=12, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Hawkeye", Id=13, Playstyles = [ "poke", "peel", "sniper" ], Role="Duelist", ImageId=13, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Hela", Id=14, Playstyles = [ "poke", "peel" ], Role="Duelist", ImageId=14, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Iron Fist", Id=15, Playstyles = [ "dive", "peel", "flank" ], Role="Duelist", ImageId=15, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Iron Man", Id=16, Playstyles = [ "control", "poke" ], Role="Duelist", ImageId=16, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Human Torch", Id=17, Playstyles = [ "control", "poke" ], Role="Duelist", ImageId=17, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Magik", Id=18, Playstyles = [ "pressure", "dive", "flank" ], Role="Duelist", ImageId=18, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Mr Fantastic", Id=19, Playstyles = [ "pressure", "peel" ], Role="Duelist", ImageId=19, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Moon Knight", Id=20, Playstyles = [ "control", "pressure" ], Role="Duelist", ImageId=20, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Namor", Id=21, Playstyles = [ "control", "peel" ], Role="Duelist", ImageId=21, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Psylocke", Id=22, Playstyles = [ "dive", "poke", "flank" ], Role="Duelist", ImageId=22, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Scarlet Witch", Id=23, Playstyles = [ "pressure", "peel" ], Role="Duelist", ImageId=23, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Spider-Man", Id=24, Playstyles = [ "dive", "flank" ], Role="Duelist", ImageId=24, IsFavorite=true, Rank=0 },
    new HeroModel { Name="Squirrel Girl", Id=25, Playstyles = [ "pressure", "control" ], Role="Duelist", ImageId=25, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Star-Lord", Id=26, Playstyles = [ "pressure", "peel" ], Role="Duelist", ImageId=26, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Storm", Id=27, Playstyles = [ "peel", "buff" ], Role="Duelist", ImageId=27, IsFavorite=false, Rank=0 },
    new HeroModel { Name="The Punisher", Id=28, Playstyles = [ "control", "pressure" ], Role="Duelist", ImageId=28, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Winter Soldier", Id=29, Playstyles = [ "pressure" ], Role="Duelist", ImageId=29, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Wolverine", Id=30, Playstyles = [ "pressure", "peel" ], Role="Duelist", ImageId=30, IsFavorite=false, Rank=0 },

    new HeroModel { Name="Adam Warlock", Id=31, Playstyles = [ "heal", "poke" ], Role="Strategist", ImageId=31, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Cloak and Dagger", Id=32, Playstyles = [ "heal", "pressure" ], Role="Strategist", ImageId=32, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Invisible Woman", Id=33, Playstyles = [ "heal", "shield" ], Role="Strategist", ImageId=33, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Jeff the Land Shark", Id=34, Playstyles = [ "heal"], Role="Strategist", ImageId=34, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Loki", Id=35, Playstyles = [ "heal", "control" ], Role="Strategist", ImageId=35, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Luna Snow", Id=36, Playstyles = [ "heal", "poke" ], Role="Strategist", ImageId=36, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Mantis", Id=37, Playstyles = [ "heal", "dive" ], Role="Strategist", ImageId=37, IsFavorite=false, Rank=0 },
    new HeroModel { Name="Rocket Raccoon", Id=38, Playstyles = [ "heal", "peel" ], Role="Strategist", ImageId=38, IsFavorite=false, Rank=0 },
};


        [HttpGet("role/{role}")]
        public HeroModel[] GetHeroesByRole(string role)
        {
            HeroModel[] heroes = Heroes.Where(i => i.Role == role).ToArray();
            return heroes;
        }

        [HttpGet("playstyle/{playstyle}")]
        public HeroModel[] GetHeroesByPlaystyle(string playstyle)
        {
            HeroModel[] heroes = Heroes.Where(i => i.Playstyles.Contains(playstyle)).ToArray();
            return heroes;
        }

        [HttpGet("favorite")]
        public HeroModel[] GetFavoriteHeroes()
        {
            HeroModel[] heroes = Heroes.Where(i => i.IsFavorite).ToArray();
            return heroes;
        }

        [HttpGet("Wolverine")]
        public HeroModel[] GetWolverine()
        {
            HeroModel[] heroes = Heroes.Where(i => i.Id == 30).ToArray();
            return heroes;
        }

        [HttpGet]
        public HeroModel[] GetAllHeroes()
        {
            return Heroes.ToArray(); // Returns the entire list of heroes
        }
    }
}
