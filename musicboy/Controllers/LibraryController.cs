using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using musicboy.Models;

namespace musicboy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        // GET: api/Library
        [HttpGet]
        public List<Song> Get()
        {

            Songs.songList.Clear();

            DirectoryInfo d = new DirectoryInfo("music");//Assuming Test is your Folder
            DirectoryInfo[] Genres = d.GetDirectories(); //Getting Text files
            foreach (DirectoryInfo Genre in Genres)
            {

                DirectoryInfo q = new DirectoryInfo($"music/{Genre.Name}");//Assuming Test is your Folder
                FileInfo[] Files = q.GetFiles("*.mp3"); //Getting Text files
                foreach (FileInfo file in Files)
                {
                    var song = new Song();
                    song.title = file.Name.Replace(file.Extension, ""); 
                    song.path = file.FullName;
                    song.genre = Genre.Name;

                    Songs.songList.Add(song);
                }
            }

            return Songs.songList;
        }

        // GET: api/Library/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Library
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Library/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
