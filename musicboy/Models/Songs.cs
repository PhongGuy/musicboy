using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace musicboy.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Album { get; set; }
        public uint Track { get; set; }
        public string Artist { get; set; }
        public uint Year { get; set; }
        public string Picture { get; set; }
        public string Path { get; set; }
        public TimeSpan Duration { get; set; }
    }

    public class Songs
    {
        static public List<Song> songList = new List<Song>();
    }
    public class SongAlbum
    {
        public int Id { get; set; }
        public string Genre { get; set; }
        public string Album { get; set; }
        public string Artist { get; set; }
        public uint Year { get; set; }
        public Song Previous { get; set; }
        public Song Next { get; set; }
        public string Picture { get; set; }
        public IList<Song> Songs { get; set; }
    }
}
