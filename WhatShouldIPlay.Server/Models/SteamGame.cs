using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//Class for the representation of a steam game
public class SteamGame
{
    //Id for the steam game in the database
    public int Id { get; set; }
    //The AppID for the game
    public string SteamID { get; set; }

    //The name of the game
    public string? Name { get; set; }
    //The player's playtime with the game in the last 2 weeks according to steam
    public int recentPlaytime { get; set; }
    //The player's playtime with the game in the entire history of owning the game
    public int totalPlayime { get; set; }
    //The genres of the game, intialized as empty
    public string Genres { get; set; } = string.Empty;
    //The owner of the game's steamID
    public string UserSteamId { get; set; }
    //The hash of the games icon image from steam
    public string? imageIconHash { get; set; }
   
    

    //The array of genres of the game from the csv string genres
    [NotMapped]
    public List<string> GenresArray
    {
        get => new(Genres?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries) ?? Array.Empty<string>());
        set => Genres = string.Join(",", value ?? new List<string>());
    }

    // Required by EF
    public SteamGame() { }
    
    //Constructs the game with the given parameters.
    public SteamGame(string steamid, string? name, List<string> genresArray, string? recentPlaytime, string? totalPlayime, string userSteamId, string imageiconhash)
    {
        SteamID = steamid;
        Name = name;
        GenresArray = genresArray;
        this.recentPlaytime = int.Parse(recentPlaytime);
        this.totalPlayime = int.Parse(totalPlayime);
        UserSteamId = userSteamId;
        this.imageIconHash = imageiconhash;
    }
}
