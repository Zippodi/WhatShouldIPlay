using System.Globalization;
using Azure;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WhatShouldIPlay.Server.Models;
using WhatShouldIPlay.Server.Services;

namespace WhatShouldIPlay.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HeroController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly string _apiKey;

        public HeroController(ApplicationDbContext context, string apiKey)
        {
            this.context = context;
            _apiKey = apiKey;
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

        [HttpGet("mostPlayedHeroes/{username}")]
        public async Task GetMostPlayedHeroes(string username)
        {

            HttpClient client = new HttpClient();

            // Add headers globally for this client (applies to all requests)

            client.DefaultRequestHeaders.Add("x-api-key", _apiKey);
            


            try
            {
                // Make a GET request
                //HttpResponseMessage response = await client.GetAsync($"https://marvelrivalsapi.com/api/v1/player/{username}");
                HttpResponseMessage response = await client.GetAsync($"https://marvelrivalsapi.com/api/v1/player/{Uri.EscapeDataString(username)}?season=1");

                // Ensure the response is successful
                response.EnsureSuccessStatusCode();


                // Read the response content
                string responseBody = await response.Content.ReadAsStringAsync();


                var jsonObject = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseBody);

                // Now assuming heroes_ranked is part of the JSON and is an array:
                var heroesRankedJson = (JArray)jsonObject["heroes_unranked"];


                var sortedHeroesByMatches = heroesRankedJson.OrderByDescending(number => (int)number["matches"]).ToList();

                if (sortedHeroesByMatches.Count < 1)
                {
                    Console.WriteLine($"Request error: Not enough playtime");
                }

                List<HeroModel> mostPlayedHeroes = new List<HeroModel>();
                // Print out each hobby and its matches
                foreach (var hero in sortedHeroesByMatches)
                {
                    string heroName = ((string)hero["hero_name"]); // make this lowercase too

                    HeroModel databaseHero = context.Heroes
                        .FirstOrDefault(dbHero => dbHero.Name == heroName);

                    if (databaseHero != null)
                    {
                        mostPlayedHeroes.Add(databaseHero);

                    }
                }

                foreach (var hero in mostPlayedHeroes)
                {
                    Console.WriteLine(hero.Name);
                }







            }




            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request error: {e.Message}");

            }
        }

        [HttpGet]
        public HeroModel[] GetAllHeroes()
        {
            return context.Heroes.ToArray(); // Returns the entire list of heroes
        }
    }
}
