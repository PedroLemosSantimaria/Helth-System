using ApiHelth.Data;
using ApiHelth.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiHelth.Repositories
{
    public class EspecialidadeRepository : IEspecialidadeRepository
    {
        private readonly AppDbContext _context;

        public EspecialidadeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Especialidade>> GetAllAsync()
        {
            return await _context.Especialidades
                .AsNoTracking()
                .OrderBy(e => e.Nome)
                .ToListAsync();
        }
    }
}
