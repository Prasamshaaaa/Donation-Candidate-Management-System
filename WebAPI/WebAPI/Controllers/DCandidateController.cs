using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DCandidateController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public DCandidateController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/DCandidate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DCandidate>>> GetDCandidates()
        {
            return await _context.DCandidates.ToListAsync();
        }

        // GET: api/DCandidate/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DCandidate>> GetDCandidateById(int id)
        {
            var dCandidate = await _context.DCandidates.FindAsync(id);
            if (dCandidate == null)
            {
                return NotFound();
            }
            return dCandidate;
        }


        // POST: api/DCandidate
        [HttpPost]
        public async Task<ActionResult<DCandidate>> AddDCandidate(DCandidateCreateDTO dCandidateDto)
        {
            var dCandidate = new DCandidate
            {
                FullName = dCandidateDto.FullName,
                Mobile = dCandidateDto.Mobile,
                Email = dCandidateDto.Email,
                Age = dCandidateDto.Age,
                BloodGroup = dCandidateDto.BloodGroup,
                Address = dCandidateDto.Address
            };

            _context.DCandidates.Add(dCandidate);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDCandidateById), new { id = dCandidate.ID }, dCandidate);
        }

        // PUT: api/DCandidate/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDCandidate(int id, DCandidate dCandidate)
        {
            if (id != dCandidate.ID)
            {
                return BadRequest();
            }

            _context.Entry(dCandidate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DCandidateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw; // This will exit the method, no need for return below
                }
            }

            return NoContent(); // Now properly placed outside the catch block
        }


        // DELETE: api/DCandidate/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<DCandidate>> DeleteDCandidate(int id)
        {
            var dCandidate = await _context.DCandidates.FindAsync(id);
            if (dCandidate == null)
            {
                return NotFound();
            }

            _context.DCandidates.Remove(dCandidate);
            await _context.SaveChangesAsync();
            return dCandidate;
        }

        private bool DCandidateExists(int id)
        {
            return _context.DCandidates.Any(d => d.ID == id);
        }

    }
}