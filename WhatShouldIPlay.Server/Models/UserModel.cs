namespace WhatShouldIPlay.Server.Models
{
    public class UserModel
    {
        public int Id { get; set; }

        public string? MarvelRivalsUsername { get; set; }

        public string? Username { get; set; }

        public string? SteamID { get; set; }

        public DateTime? AccessTime { get; set; }

        // Navigation property to list of games
        public ICollection<SteamGame>? SteamGames { get; set; }
    }
}
