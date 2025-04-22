using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhatShouldIPlay.Server.Migrations
{
    /// <inheritdoc />
    public partial class ThirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Heroes",
                table: "Heroes");

            migrationBuilder.RenameTable(
                name: "Heroes",
                newName: "HeroModel");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HeroModel",
                table: "HeroModel",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HeroModel",
                table: "HeroModel");

            migrationBuilder.RenameTable(
                name: "HeroModel",
                newName: "Heroes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Heroes",
                table: "Heroes",
                column: "Id");
        }
    }
}
