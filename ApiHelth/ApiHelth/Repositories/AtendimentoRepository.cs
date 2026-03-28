using ApiHelth.Data;
using ApiHelth.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiHelth.Repositories
{
    public class AtendimentoRepository : IAtendimentoRepository
    {
        private readonly AppDbContext _context;

        public AtendimentoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Atendimento>> GetAllAsync()
        {
            return await _context.Atendimentos
                .Include(a => a.StatusAtendimento)
                .Include(p => p.Paciente)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Atendimento> GetByIdAsync(int id)
        {
            return await _context.Atendimentos
                .Include(a => a.StatusAtendimento)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task AddAsync(Atendimento atendimento)
        {
            await _context.Atendimentos.AddAsync(atendimento);
        }

        public void Update(Atendimento atendimento)
        {
            _context.Atendimentos.Update(atendimento);
        }

        public async Task<int> GetNextNumeroSequencial()
        {
            var last = await _context.Atendimentos
                .OrderByDescending(a => a.NumeroSequencial)
                .Select(a => a.NumeroSequencial)
                .FirstOrDefaultAsync();

            return last + 1;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
