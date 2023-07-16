using Glossary.Api.Models;
using Glossary.Api.Models.Request;
using Glossary.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Net;
using System.Threading.Tasks;

namespace Glossary.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GlossaryTermController : ControllerBase
    {
        private readonly IGlossaryTermService _glossaryTermService;

        public GlossaryTermController(IGlossaryTermService glossaryTermService)
        {
            _glossaryTermService = glossaryTermService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _glossaryTermService.GetAllGlossaryTerms());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GlossaryTermInsertRequest request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var guid = await _glossaryTermService.InsertGlossaryTerm(request);
                    return Ok(guid);
                }
            }
            catch (DataException)
            {
                ModelState.AddModelError(string.Empty, "Unable to insert record.");
            }
            return BadRequest();
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] GlossaryTermUpdateRequest request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (await _glossaryTermService.UpdateGlossaryTerm(request))
                    {
                        return Ok();
                    }
                    return NotFound();
                }
            }
            catch (DataException)
            {
                ModelState.AddModelError(string.Empty, "Unable to update record.");
            }
            return BadRequest();
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _glossaryTermService.DeleteGlossaryTerm(id);

            return Ok();
        }
    }
}
