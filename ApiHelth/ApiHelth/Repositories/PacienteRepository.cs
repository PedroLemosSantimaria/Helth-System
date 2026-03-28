using ApiHelth.Data;
using ApiHelth.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiHelth.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        private readonly AppDbContext _context;

        public PacienteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Paciente>> GetAllAsync()
        {
            return await _context.Pacientes.AsNoTracking().ToListAsync();
        }

        public async Task<Paciente> GetByIdAsync(int id)
        {
            return await _context.Pacientes.FindAsync(id);
        }

        public async Task AddAsync(Paciente paciente)
        {
            await _context.Pacientes.AddAsync(paciente);
        }

        public void Update(Paciente paciente)
        {
            _context.Pacientes.Update(paciente);
        }

        public void Delete(Paciente paciente)
        {
            _context.Pacientes.Remove(paciente);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
