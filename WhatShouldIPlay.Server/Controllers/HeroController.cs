﻿using Microsoft.AspNetCore.Mvc;
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
            new HeroModel { Name="Groot", Id=3, Playstyles = [ "shield", "control" ], Role="Vanguard", ImageId=3, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Hulk", Id=4, Playstyles = [ "dive", "peel" ], Role="Vanguard", ImageId=4, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Magneto", Id=5, Playstyles = [ "shield", "poke" ], Role="Vanguard", ImageId=5, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Peni Parker", Id=6, Playstyles = [ "control" ], Role="Vanguard", ImageId=6, IsFavorite=false, Rank=0 },
            new HeroModel { Name="The Thing", Id=7, Playstyles = [ "dive", "peel" ], Role="Vanguard", ImageId=7, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Thor", Id=8, Playstyles = [ "pressure", "peel" ], Role="Vanguard", ImageId=8, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Venom", Id=9, Playstyles = [ "dive", "pressure" ], Role="Vanguard", ImageId=9, IsFavorite=false, Rank=0 },

            new HeroModel { Name="Black Panther", Id=10, Playstyles = [ "dive", "peel", "flank" ], Role="Duelist", ImageId=10, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Black Widow", Id=11, Playstyles = [ "poke", "sniper" ], Role="Duelist", ImageId=11, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Hawkeye", Id=12, Playstyles = [ "poke", "peel", "sniper" ], Role="Duelist", ImageId=12, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Hela", Id=13, Playstyles = [ "poke", "peel" ], Role="Duelist", ImageId=13, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Iron Fist", Id=14, Playstyles = [ "dive", "peel", "flank" ], Role="Duelist", ImageId=14, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Iron Man", Id=15, Playstyles = [ "control", "poke" ], Role="Duelist", ImageId=15, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Human Torch", Id=16, Playstyles = [ "control", "poke" ], Role="Duelist", ImageId=16, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Magik", Id=17, Playstyles = [ "pressure", "dive", "flank" ], Role="Duelist", ImageId=17, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Mr Fantastic", Id=18, Playstyles = [ "pressure", "peel" ], Role="Duelist", ImageId=18, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Moon Knight", Id=19, Playstyles = [ "control", "pressure" ], Role="Duelist", ImageId=19, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Namor", Id=20, Playstyles = [ "control", "peel" ], Role="Duelist", ImageId=20, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Psylocke", Id=21, Playstyles = [ "dive", "poke", "flank" ], Role="Duelist", ImageId=21, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Scarlet Witch", Id=22, Playstyles = [ "pressure", "peel" ], Role="Duelist", ImageId=22, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Spider-Man", Id=23, Playstyles = [ "dive", "flank" ], Role="Duelist", ImageId=23, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Squirrel Girl", Id=24, Playstyles = [ "pressure", "control" ], Role="Duelist", ImageId=24, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Star-Lord", Id=25, Playstyles = [ "pressure", "peel" ], Role="Duelist", ImageId=25, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Storm", Id=26, Playstyles = [ "peel", "buff" ], Role="Duelist", ImageId=26, IsFavorite=false, Rank=0 },
            new HeroModel { Name="The Punisher", Id=27, Playstyles = [ "control", "pressure" ], Role="Duelist", ImageId=27, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Winter Soldier", Id=28, Playstyles = [ "pressure" ], Role="Duelist", ImageId=28, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Wolverine", Id=29, Playstyles = [ "pressure", "peel" ], Role="Duelist", ImageId=29, IsFavorite=false, Rank=0 },

            new HeroModel { Name="Adam Warlock", Id=30, Playstyles = [ "dive", "flank" ], Role="Strategist", ImageId=30, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Cloak and Dagger", Id=31, Playstyles = [ "dive", "flank" ], Role="Strategist", ImageId=31, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Invisible Woman", Id=32, Playstyles = [ "dive", "flank" ], Role="Strategist", ImageId=32, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Jeff the Land Shark", Id=33, Playstyles = [ "dive", "flank" ], Role="Strategist", ImageId=33, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Loki", Id=34, Playstyles = [ "dive", "flank" ], Role="Strategist", ImageId=34, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Luna Snow", Id=35, Playstyles = [ "dive", "flank" ], Role="Strategist", ImageId=35, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Mantis", Id=36, Playstyles = [ "dive", "flank" ], Role="Strategist", ImageId=36, IsFavorite=false, Rank=0 },
            new HeroModel { Name="Rocket Raccoon", Id=37, Playstyles = [ "dive", "flank" ], Role="Strategist", ImageId=37, IsFavorite=false, Rank=0 },
        };

        [HttpGet("{role}")]
        public HeroModel[] Get(string role)
        {
            HeroModel[] heroes = Heroes.Where(i => i.Role == role).ToArray();
            return heroes;
        }

        [HttpGet]
        public HeroModel[] GetAllHeroes()
        {
            return Heroes.ToArray(); // Returns the entire list of heroes
        }
    }
}
