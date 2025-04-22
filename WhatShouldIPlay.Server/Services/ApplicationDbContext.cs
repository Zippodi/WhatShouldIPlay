using Microsoft.EntityFrameworkCore;
using WhatShouldIPlay.Server.Models;

namespace WhatShouldIPlay.Server.Services
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public required DbSet<HeroModel> Heroes { get; set; }

        public required DbSet<SteamGame> SteamGames { get; set; }

        public required DbSet<UserModel> Users { get; set; }
    }
}
