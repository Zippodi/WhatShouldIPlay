using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhatShouldIPlay.Server.Migrations
{
    /// <inheritdoc />
    public partial class _10thLaptopMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HeroStats_Heroes_heroId",
                table: "HeroStats");

            migrationBuilder.RenameColumn(
                name: "heroId",
                table: "HeroStats",
                newName: "HeroId");

            migrationBuilder.RenameIndex(
                name: "IX_HeroStats_heroId",
                table: "HeroStats",
                newName: "IX_HeroStats_HeroId");

            migrationBuilder.AlterColumn<int>(
                name: "HeroId",
                table: "HeroStats",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_HeroStats_Heroes_HeroId",
                table: "HeroStats",
                column: "HeroId",
                principalTable: "Heroes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HeroStats_Heroes_HeroId",
                table: "HeroStats");

            migrationBuilder.RenameColumn(
                name: "HeroId",
                table: "HeroStats",
                newName: "heroId");

            migrationBuilder.RenameIndex(
                name: "IX_HeroStats_HeroId",
                table: "HeroStats",
                newName: "IX_HeroStats_heroId");

            migrationBuilder.AlterColumn<int>(
                name: "heroId",
                table: "HeroStats",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_HeroStats_Heroes_heroId",
                table: "HeroStats",
                column: "heroId",
                principalTable: "Heroes",
                principalColumn: "Id");
        }
    }
}
