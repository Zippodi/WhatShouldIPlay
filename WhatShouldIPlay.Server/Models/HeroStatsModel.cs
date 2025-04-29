namespace WhatShouldIPlay.Server.Models
{
    //Class for the table called HeroStats in the database. Allows 
    //a user to have stats for each hero, namely playtime.
    public class HeroStatsModel
    {
        //HeroStats id in the database
        public int Id { get; set; }
        //User's username
        public string? Username { get; set; }

        //The user
        public UserModel? user { get; set; }

        //The hero's name 
        public string? HeroName { get; set; }
        public int HeroId { get; set; } // foreign key

        //The hero to have stats for
        public HeroModel? hero { get; set; }

        //The user's playtime with the hero
        public double HeroPlaytime  { get; set; }
    }
}
