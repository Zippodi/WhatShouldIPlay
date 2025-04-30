using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhatShouldIPlay.Server.Migrations
{
    /// <inheritdoc />
    public partial class LaptopMigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SteamGames_Users_UserModelId",
                table: "SteamGames");

            migrationBuilder.DropIndex(
                name: "IX_SteamGames_UserModelId",
                table: "SteamGames");

            migrationBuilder.DropColumn(
                name: "UserModelId",
                table: "SteamGames");

            migrationBuilder.AddColumn<string>(
                name: "UserSteamId",
                table: "SteamGames",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserSteamId",
                table: "SteamGames");

            migrationBuilder.AddColumn<int>(
                name: "UserModelId",
                table: "SteamGames",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SteamGames_UserModelId",
                table: "SteamGames",
                column: "UserModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_SteamGames_Users_UserModelId",
                table: "SteamGames",
                column: "UserModelId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
