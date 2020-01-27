using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using musicboy.Helpers;
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
            return Functions.GetSongs();
        }

        // GET: api/Library/5
        [HttpGet("{id}")]
        public SongAlbum Get(int id)
        {
            SongAlbum album = new SongAlbum();
            var songs = Functions.GetSongs();

            foreach (var item in songs)
            {
                if (item.Id == id)
                {
                    album.Id = item.Id;
                    album.Album = item.Album;
                    album.Picture = item.Picture;
                    album.Artist = item.Artist;
                    album.Genre = item.Genre;
                    album.Year = item.Year;
                    album.Next = songs.Where(a => a.Album == album.Album).OrderBy(a => a.Track).Where(a => a.Track > item.Track).FirstOrDefault();
                    album.Previous = songs.Where(a => a.Album == album.Album).Where(a => a.Track == (item.Track - 1)).FirstOrDefault();

                    break;
                }
            }

            if (album.Next == null)
            {
                album.Next = songs.Where(a => a.Album == album.Album).OrderBy(a => a.Track).First();
            }

            if (album.Previous == null)
            {
                album.Previous = songs.Where(a => a.Album == album.Album).OrderBy(a => a.Track).Last();
            }

            album.Songs = songs.Where(a => a.Album == album.Album).OrderBy(a => a.Track).ToList();

            return album;
        }

        //// POST: api/Library
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Library/5
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
