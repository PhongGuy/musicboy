using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using musicboy.Helpers;
using musicboy.Models;

namespace musicboy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        // GET: api/Playlist
        [HttpGet]
        public List<Playlist> Get()
        {
            return Functions.GetPlaylists();
        }

        // GET: api/Playlist/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        //// POST: api/Playlist
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Playlist/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
