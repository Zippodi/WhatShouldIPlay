using Microsoft.EntityFrameworkCore;
using WhatShouldIPlay.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // Allows any origin
              .AllowAnyMethod()   // Allows any HTTP method (GET, POST, etc.)
              .AllowAnyHeader();  // Allows any headers
    });
});

//var apiKey = builder.Configuration["ApiSettings:ApiKey"];
//var steamApiKey = builder.Configuration["ApiSettings:SteamApiKey"];
//builder.Services.AddSingleton(apiKey);
//builder.Services.AddSingleton(steamApiKey);
var apiSettings = builder.Configuration.GetSection("ApiSettings")
    .Get<Dictionary<string, string>>();

builder.Services.AddSingleton(apiSettings);



// Add services to the container
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString);
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAll");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
