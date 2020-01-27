using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace musicboy.Models
{
    public class Playlist
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public IList<Song> songList { get; set; }
    }
    public class Playlists
    {
        static public List<Playlist> playlists = new List<Playlist>();
    }
}
