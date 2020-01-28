using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using musicboy.Helpers;
using musicboy.Models;
using System.Linq;

namespace musicboy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RandomPlaylistController : ControllerBase
    {
        // GET: api/RandomPlaylist
        [HttpGet]
        public List<Song> Get()
        {
            string pathString = Path.Combine("ClientApp/src/music/playlists", "RANDOM_PLAYLIST");

            if (Directory.Exists(pathString))
            {
                DirectoryInfo di = new DirectoryInfo(pathString);

                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
            }

            Directory.CreateDirectory(pathString);
            DirectoryInfo d = new DirectoryInfo(pathString);

            List<Song> songsList = Functions.GetSongs();
            List<Song> playlist = new List<Song>();

            var random = new Random();
            int id = 1;
            double duration = 0;

            while(duration < 3600)
            {
                var randomIndex = random.Next(0, songsList.Count);

                Song s = songsList[randomIndex];
                s.Track = Convert.ToUInt32(id++);

                songsList.RemoveAt(randomIndex);

                duration += Math.Floor(s.Duration.TotalSeconds);

                playlist.Add(s);
            }

            id = 1;

            foreach (var song in playlist)
            {
                DirectoryInfo path = new DirectoryInfo("ClientApp/src/");
                var from = path.FullName + song.Path;
                var to = d.FullName +"/"+ id++ + ".mp3";
                System.IO.File.Copy(from, to);
            }

            return playlist;
        }

        // GET: api/RandomPlaylist/make
        [HttpGet("{name}")]
        public int Get(string name)
        {
            int i = System.IO.Directory.GetDirectories("ClientApp/src/music/playlists").Length;

            string pathString = Path.Combine("ClientApp/src/music/playlists", "RANDOM_PLAYLIST");

            string newPath = Path.Combine("ClientApp/src/music/playlists", name.ToString());

            DirectoryInfo d = new DirectoryInfo(pathString);

            d.MoveTo(newPath);

            return i;
        }

        //// POST: api/RandomPlaylist
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/RandomPlaylist/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
