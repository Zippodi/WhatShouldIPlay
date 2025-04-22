using System.ComponentModel.DataAnnotations.Schema;

namespace WhatShouldIPlay.Server.Models
{
    public class SteamGame
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? recentPlaytime { get; set; }
        public string? totalPlayime { get; set; }

        public string Genres { get; set; } = string.Empty;

        public int UserModelId { get; set; }

        public UserModel? User { get; set; }

        [NotMapped]
        public List<string> GenresArray
        {
            get => new(Genres.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
            set => Genres = string.Join(",", value);
        }
    }
}