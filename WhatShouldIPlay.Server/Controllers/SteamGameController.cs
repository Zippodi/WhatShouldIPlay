using System.Net;
using Microsoft.AspNetCore.Mvc;
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
        private readonly string _steamApiKey;

        public SteamGameController(ApplicationDbContext context, String steamApiKey)
        {
            this.context = context;
            this._steamApiKey = steamApiKey;

        }




        [HttpGet("steamgames/{steamid}")]
        public async Task<IActionResult> GetAllSteamGames(string steamid)
        {
            var handler = new HttpClientHandler
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };

            HttpClient client = new HttpClient(handler)
{
    Timeout = TimeSpan.FromMinutes(10) // adjust as needed
};

            HttpResponseMessage response = await client.GetAsync($"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={Uri.EscapeDataString(_steamApiKey)}&steamid={Uri.EscapeDataString(steamid)}&format=json");
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();

            //var jsonObject = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseBody);
            //var responseArray = (JArray)jsonObject["response"];
            //var gamesArray = responseArray["games"];

            var root = JObject.Parse(responseBody);
            var gamesArray = root["response"]?["games"] as JArray;


            var games = new List<SteamGame>();
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
                //var genres = data?["genres"]?.Select(g => g["description"].ToString()).ToList();

                if (string.IsNullOrWhiteSpace(name))
                    continue;

                var newGame = new SteamGame(int.Parse(appId), name);

                games.Add(newGame);

                // Save to DB here
            }








            //SteamGame[] games = context.SteamGames.Where(i => i.UserModelId.Equals(steamid)).ToArray();
            return Ok(games);
        }


    }
}
