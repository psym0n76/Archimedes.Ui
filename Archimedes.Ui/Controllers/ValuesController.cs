using System.Collections.Generic;
using System.Linq;
using Archimedes.Ui.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Archimedes.Ui.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly IHubContext<ValuesHub> _context;

        public ValuesController(IHubContext<ValuesHub> context)
        {
            _context = context;
        }

        public static List<string> Source { get; set; } = new List<string>();

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            if (Source.Any())
            {
                return Source; 
            }

            return Ok("No Data");
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return Source[id];
        }

        // POST api/values
        [HttpPost]
        public async void Post([FromBody] string value)
        {
            Source.Add(value);
            await _context.Clients.All.SendAsync("Add", value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            Source[id] = value;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            var item = Source[id];
            Source.Remove(item);
            await _context.Clients.All.SendAsync("Delete", item);

        }
    }
}