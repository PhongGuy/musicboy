using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace musicboy.Models
{
    public class Song
    {
        public string title { get; set; }
        public string genre { get; set; }
        public string artist { get; set; }
        public string path { get; set; }
        public TimeSpan duration { get; set; }
    }

    public class Songs
    {
        static public List<Song> songList = new List<Song>();
    }
}
