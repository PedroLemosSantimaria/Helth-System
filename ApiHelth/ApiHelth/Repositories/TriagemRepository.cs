using ApiHelth.Data;
using ApiHelth.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiHelth.Repositories
{
    public class TriagemRepository : ITriagemRepository
    {
        private readonly AppDbContext _context;

        public TriagemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Triagem>> GetAllAsync()
        {
            return await _context.Triagens
                .Include(t => t.Especialidade)
                .Include(t => t.Atendimento)
                    .ThenInclude(a => a.Paciente)
                .Include(t => t.Atendimento)
                    .ThenInclude(a => a.StatusAtendimento)
                .AsNoTracking()
                .OrderByDescending(t => t.Id)
                .ToListAsync();
        }

        public async Task<Triagem> GetByAtendimentoId(int atendimentoId)
        {
            return await _context.Triagens
                .FirstOrDefaultAsync(t => t.AtendimentoId == atendimentoId);
        }

        public async Task AddAsync(Triagem triagem)
        {
            await _context.Triagens.AddAsync(triagem);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
