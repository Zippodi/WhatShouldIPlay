using System.ComponentModel.DataAnnotations.Schema;

namespace WhatShouldIPlay.Server.Models
{

    public class HeroModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        // This is the column that already exists in your database (as CSV)
        public string Playstyles { get; set; } = string.Empty;

        // Computed property that converts the CSV string to an array
        [NotMapped]  // This ensures this property is not mapped to the database
        public List<string> PlaystylesArray
        {
            get => new (Playstyles.Split(',').Select(p => p.Trim()).ToArray());
            set => Playstyles = string.Join(",", value);
        }

        public string? Role { get; set; }
        public int ImageId { get; set; }
    }
}
