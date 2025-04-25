using System.Globalization;
using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly Dictionary<string, string> _apiSettings;

        public HeroController(ApplicationDbContext context, Dictionary<string, string> apiSettings)
        {
            this.context = context;
            _apiSettings = apiSettings;

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
        public async Task<List<HeroModel>> GetMostPlayedHeroes(string username)
        {
            Console.WriteLine($"Method triggered for username: {username}");

            HttpClient client = new HttpClient();

            // Add headers globally for this client (applies to all requests)
            Console.WriteLine(_apiSettings["ApiKey"]);
            client.DefaultRequestHeaders.Add("x-api-key", _apiSettings["ApiKey"]);



            try
            {
                // Make a GET request
                HttpResponseMessage response = await client.GetAsync($"https://marvelrivalsapi.com/api/v1/player/{Uri.EscapeDataString(username)}?season={1}");
                HttpResponseMessage response2 = await client.GetAsync($"https://marvelrivalsapi.com/api/v1/player/{Uri.EscapeDataString(username)}?season={2}");

                // Ensure the response is successful
                response.EnsureSuccessStatusCode();
                response2.EnsureSuccessStatusCode();


                // Read the response content
                string responseBody = await response.Content.ReadAsStringAsync();
                string responseBody2 = await response2.Content.ReadAsStringAsync();
                Console.WriteLine($"Status code: {response.StatusCode}");
                Console.WriteLine($"Headers: {response.Headers}"); 
                Console.WriteLine($"Status code: {response2.StatusCode}");
                Console.WriteLine($"Headers: {response2.Headers}");


                var jsonObject = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseBody);
                var jsonObject2 = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseBody2);


                // Now assuming heroes_ranked is part of the JSON and is an array:
                var unrankedArray = (JArray)jsonObject["heroes_unranked"];
                var rankedArray = (JArray)jsonObject["heroes_ranked"];

                var unrankedArray2 = (JArray)jsonObject2["heroes_unranked"];
                var rankedArray2 = (JArray)jsonObject2["heroes_ranked"];

                var season1Array = unrankedArray.Concat(rankedArray);
                var season2Array = unrankedArray2.Concat(rankedArray2);

                var combinedArray = season1Array.Concat(season2Array);




                var sortedHeroesByMatches = combinedArray
               .GroupBy(hero => hero["hero_name"]?.ToString())
               .Select(group =>
               {
                   // Pick any instance (e.g., first) and modify its matches field
                   var heroObj = (JObject)group.First().DeepClone();
                   heroObj["matches"] = group.Sum(h => (int)h["matches"]);
                   return heroObj;
               })
               .OrderByDescending(h => (int)h["matches"])
               .ToList();

                if (sortedHeroesByMatches.Count < 1)
                {
                    Console.WriteLine($"Request error: Not enough playtime");
                }

                List<HeroModel> mostPlayedHeroes = new List<HeroModel>();

                foreach (var hero in sortedHeroesByMatches)
                {
                    string heroName = ((string)hero["hero_name"]);

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




                return mostPlayedHeroes;


            }




            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request error: {e.Message}");
                return null;
            }
        }


        //Get Endpoint for getting the given user's most played heroes of the given season.
        [HttpGet("mostPlayedHeroes/{username}/{season}")]
        public async Task<List<HeroModel>> GetMostPlayedHeroes(string username, int season)
        {

            HttpClient client = new HttpClient();

            // Add headers globally for this client (applies to all requests)

            client.DefaultRequestHeaders.Add("x-api-key", _apiSettings["ApiKey"]);
            


            try
            {
                // Make a GET request
                //HttpResponseMessage response = await client.GetAsync($"https://marvelrivalsapi.com/api/v1/player/{username}");
                HttpResponseMessage response = await client.GetAsync($"https://marvelrivalsapi.com/api/v1/player/{Uri.EscapeDataString(username)}?season={season}");

                // Ensure the response is successful
                response.EnsureSuccessStatusCode();


                // Read the response content
                string responseBody = await response.Content.ReadAsStringAsync();


                var jsonObject = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseBody);

                // Now assuming heroes_ranked is part of the JSON and is an array:
                var unrankedArray = (JArray)jsonObject["heroes_unranked"];
                var rankedArray = (JArray)jsonObject["heroes_ranked"];

                var combinedArray = unrankedArray.Concat(rankedArray);

                

                 var sortedHeroesByMatches = combinedArray
                .GroupBy(hero => hero["hero_name"]?.ToString()) 
                .Select(group =>
                {
                    // Pick any instance (e.g., first) and modify its matches field
                    var heroObj = (JObject)group.First().DeepClone();
                    heroObj["matches"] = group.Sum(h => (int)h["matches"]);
                    return heroObj;
                })
                .OrderByDescending(h => (int)h["matches"])
                .ToList();

                if (sortedHeroesByMatches.Count < 1)
                {
                    Console.WriteLine($"Request error: Not enough playtime");
                }

                List<HeroModel> mostPlayedHeroes = new List<HeroModel>();
                
                foreach (var hero in sortedHeroesByMatches)
                {
                    string heroName = ((string)hero["hero_name"]); 

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




                return mostPlayedHeroes;


            }




            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request error: {e.Message}");
                return null;
            }
        }

        [HttpGet]
        public HeroModel[] GetAllHeroes()
        {
            return context.Heroes.ToArray(); // Returns the entire list of heroes
        }
    }
}
