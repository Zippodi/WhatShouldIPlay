using System.Net;
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
    public class SteamGameController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly Dictionary<string, string> _apiSettings;

        public SteamGameController(ApplicationDbContext context, Dictionary<string, string> apiSettings)
        {
            this.context = context;
            _apiSettings = apiSettings;


        }




        [HttpGet("steamgames/{steamid}")]
        public async Task<IActionResult> GetAllSteamGames(string steamid, bool useSteam)
        {

            var user = await context.Users.FirstOrDefaultAsync(u => u.SteamID == steamid);
            var games = new List<SteamGame>();


            if (user.SteamAccessTime?.AddDays(7) < DateTime.UtcNow)
            {
                useSteam = true;
            }

            if (useSteam)
            {

                var handler = new HttpClientHandler
                {
                    AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
                };

                HttpClient client = new HttpClient(handler)
                {
                    Timeout = TimeSpan.FromMinutes(10) // adjust as needed
                };

                HttpResponseMessage response = await client.GetAsync($"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={Uri.EscapeDataString(_apiSettings["SteamApiKey"])}&steamid={Uri.EscapeDataString(steamid)}&format=json");
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                //var jsonObject = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseBody);
                //var responseArray = (JArray)jsonObject["response"];
                //var gamesArray = responseArray["games"];

                var root = JObject.Parse(responseBody);
                var gamesArray = root["response"]?["games"] as JArray;


                foreach (var game in gamesArray)
                {
                    string appId = game["appid"]?.ToString();
                    if (string.IsNullOrEmpty(appId))
                        continue;

                    await Task.Delay(150); // Be nice to Steam!

                    var gameDetailsResponse = await client.GetAsync($"https://store.steampowered.com/api/appdetails?appids={appId}&cc=us&l=en");
                    string detailsJson = await gameDetailsResponse.Content.ReadAsStringAsync();
                    var parsed = JObject.Parse(detailsJson);
                    var appDetails = parsed[appId];

                    if (appDetails?["success"]?.Value<bool>() != true)
                        continue;

                    var data = appDetails["data"];
                    var name = data?["name"]?.ToString();
                    var genres = data?["genres"]?.Select(g => g["description"].ToString()).ToList();

                    if (string.IsNullOrWhiteSpace(name))
                        continue;
                    string recentPlaytime = "0";
                    if (game["playtime_2weeks"] != null && !string.IsNullOrEmpty(game["playtime_2weeks"].ToString()))
                    {
                        recentPlaytime = game["playtime_2weeks"].ToString();
                    }
                    var newGame = new SteamGame(appId, name, genres, recentPlaytime, game["playtime_forever"].ToString(), steamid);

                    games.Add(newGame);

                }



                // Get the list of existing AppIDs from the database
                var existingAppIds = await context.SteamGames
                    .Where(g => g.UserSteamId == steamid)
                    .Select(g => g.SteamID).ToListAsync();

                // Filter out games that already exist
                var newGames = games
                    .Where(g => !existingAppIds.Contains(g.SteamID))
                    .ToList();

                // Add only the new games
                context.SteamGames.AddRange(newGames);
                user.SteamAccessTime = DateTime.UtcNow;
                await context.SaveChangesAsync();

            }
            
            games = await context.SteamGames.Where(s => s.UserSteamId == steamid).OrderByDescending(s => s.totalPlayime).ToListAsync();
            

            return Ok(games);
        }


    }
}
