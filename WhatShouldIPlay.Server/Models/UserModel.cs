namespace WhatShouldIPlay.Server.Models
{
    //A class for a user in the database
    public class UserModel
    {
        //The user's id in the database
        public int Id { get; set; }

        //The user's username in marvel rivals
        public string? MarvelRivalsUsername { get; set; }
        //The user's username in this app
        public string? Username { get; set; }
        //The user's steam ID
        public string? SteamID { get; set; }
        //The time they last used the steam api
        public DateTime? SteamAccessTime { get; set; }
        //The time they last used the marvel rivals api
        public DateTime? MarvelRivalsAccessTime { get; set; }

        // Navigation property to list of games
        //public ICollection<SteamGame>? SteamGames { get; set; }
    }
}
