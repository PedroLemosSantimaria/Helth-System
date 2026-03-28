using ApiHelth.Data;
using ApiHelth.Repositories;
using ApiHelth.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var myDefaultCors = "_myDefaultCors";
// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IPacienteRepository, PacienteRepository>();
builder.Services.AddScoped<PacienteService>();

builder.Services.AddScoped<IAtendimentoRepository, AtendimentoRepository>();
builder.Services.AddScoped<ITriagemRepository, TriagemRepository>();

builder.Services.AddScoped<AtendimentoService>();
builder.Services.AddScoped<TriagemService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myDefaultCors,
                      policy =>
                      {
                          policy.AllowAnyOrigin() 
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}



app.UseCors(myDefaultCors);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
