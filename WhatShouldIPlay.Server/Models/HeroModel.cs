using System.ComponentModel.DataAnnotations.Schema;

namespace WhatShouldIPlay.Server.Models
{
    //Class for representing a hero in Marvel Rivals
    public class HeroModel
    {
        //Id for hero
        public int Id { get; set; }
        //Name of the hero
        public string? Name { get; set; }

        // CSV String of the player's playstyles
        public string Playstyles { get; set; } = string.Empty;

        // Computed property that converts the CSV string to an array
        [NotMapped]  // This ensures this property is not mapped to the database
        public List<string> PlaystylesArray
        {
            get => new (Playstyles.Split(',').Select(p => p.Trim()).ToArray());
            set => Playstyles = string.Join(",", value);
        }

        //Role of the hero
        public string? Role { get; set; }
        //Id of the Hero's image
        public int ImageId { get; set; }
    }
}
