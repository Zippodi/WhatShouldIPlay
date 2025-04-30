using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhatShouldIPlay.Server.Migrations
{
    /// <inheritdoc />
    public partial class SixthLaptopMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFavorite",
                table: "Heroes");

            migrationBuilder.DropColumn(
                name: "Rank",
                table: "Heroes");

            migrationBuilder.AddColumn<string>(
                name: "imageIconHash",
                table: "SteamGames",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "imageLogoHash",
                table: "SteamGames",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageIconHash",
                table: "SteamGames");

            migrationBuilder.DropColumn(
                name: "imageLogoHash",
                table: "SteamGames");

            migrationBuilder.AddColumn<bool>(
                name: "IsFavorite",
                table: "Heroes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Rank",
                table: "Heroes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
