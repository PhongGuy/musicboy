using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using musicboy.Helpers;
using musicboy.Models;
using System.Linq;
using System.IO;

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
        public Playlist Get(int id)
        {
            return Functions.GetPlaylists().Where(a => a.Id == id).FirstOrDefault();
        }

        // GET: api/Playlist/5/1
        [HttpGet("{id}/{song}")]
        public Playlist Get(int id, int song)
        {
            var playlist = Functions.GetPlaylists().Where(a => a.Id == id).FirstOrDefault();
            var songs = playlist.Songs.OrderBy(a => a.Id).ToList();

            playlist.Next = songs.Where(a => a.Id == song+1).FirstOrDefault();
            playlist.Previous = songs.Where(a => a.Id == song-1).FirstOrDefault();

            if (playlist.Next == null)
            {
                playlist.Next =songs.FirstOrDefault();
            }

            if (playlist.Previous == null)
            {
                playlist.Previous = songs.LastOrDefault();
            }


            return playlist;
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

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var playlists = Functions.GetPlaylists().Where(a => a.Id == id).FirstOrDefault();
            DirectoryInfo d = new DirectoryInfo("ClientApp/src/music/playlists/"+playlists.Name);
            d.Delete(true);

            return true;
        }
    }
}
