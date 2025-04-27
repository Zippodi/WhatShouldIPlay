namespace WhatShouldIPlay.Server.Models
{
    public class HeroStatsModel
    {

        public string? Username { get; set; }
        public UserModel? user { get; set; }

        public string? HeroName { get; set; }   
        public HeroModel? hero { get; set; }

        public double HeroPlaytime  { get; set; }
    }
}
