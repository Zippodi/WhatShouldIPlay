namespace WhatShouldIPlay.Server.Models
{
    public class HeroModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<string> Playstyles { get; set; } = [];
        public String? Role { get; set; }
        public int ImageId { get; set; }
        public bool IsFavorite { get; set; }
        public int Rank { get; set; }
    }
}
