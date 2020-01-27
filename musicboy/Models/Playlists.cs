using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace musicboy.Models
{
    public class Playlists
    {
        static public List<Playlist> playlists = new List<Playlist>();
    }

    public class Playlist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Duration { get; set; }
        public Song Previous { get; set; }
        public Song Next { get; set; }
        public IList<Song> Songs { get; set; }
    }

}
