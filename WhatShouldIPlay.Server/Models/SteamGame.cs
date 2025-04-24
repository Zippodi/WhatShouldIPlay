using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class SteamGame
{
    
    public int Id { get; set; }

    public string SteamID { get; set; }

    public string? Name { get; set; }
    public int recentPlaytime { get; set; }
    public int totalPlayime { get; set; }
    public string Genres { get; set; } = string.Empty;
    public string UserSteamId { get; set; }

    [NotMapped]
    public List<string> GenresArray
    {
        get => new(Genres?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries) ?? Array.Empty<string>());
        set => Genres = string.Join(",", value ?? new List<string>());
    }

    // Required by EF
    public SteamGame() { }

    public SteamGame(string steamid, string? name, List<string> genresArray, string? recentPlaytime, string? totalPlayime, string userSteamId)
    {
        SteamID = steamid;
        Name = name;
        GenresArray = genresArray;
        this.recentPlaytime = int.Parse(recentPlaytime);
        this.totalPlayime = int.Parse(totalPlayime);
        UserSteamId = userSteamId;
    }
}
