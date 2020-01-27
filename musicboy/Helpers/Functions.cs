using musicboy.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace musicboy.Helpers
{
    public class Functions
    {

        public static List<Song> GetSongs()
        {
            Songs.songList.Clear();
            int IdGiver = 1;

            DirectoryInfo d = new DirectoryInfo("ClientApp/src/music");
            FileInfo[] Files = d.GetFiles("*.mp3").OrderBy(a => a.CreationTime).ToArray();
            foreach (FileInfo File in Files)
            {

                TagLib.File songInfo = TagLib.File.Create(File.FullName);

                Song song = new Song
                {
                    Id = IdGiver++,
                    Track = songInfo.Tag.Track,
                    Year = songInfo.Tag.Year,
                    Title = songInfo.Tag.Title,
                    Album = songInfo.Tag.Album,
                    Artist = songInfo.Tag.FirstPerformer,
                    Duration = songInfo.Properties.Duration,
                    Path = "/music/" + File.Name,
                    Genre = songInfo.Tag.FirstGenre
                };

                if (songInfo.Tag.Pictures.Length > 0)
                {
                    var imgBytes = songInfo.Tag.Pictures[0].Data.Data;
                    song.Picture = "data:image/png;base64," + Convert.ToBase64String(imgBytes);
                }

                Songs.songList.Add(song);
            }

            return Songs.songList;
        }

        public static List<Playlist> GetPlaylists()
        {

            Playlists.playlists.Clear();
            int IdGiver = 1;

            //DirectoryInfo d = new DirectoryInfo("ClientApp/src/music/playlists");
            //DirectoryInfo[] playlists = d.GetDirectories().OrderBy(a => a.CreationTime).ToArray();
            //foreach (DirectoryInfo playlist in playlists)
            //{
            //    var playlist = new Playlist
            //    {
            //        Name = ,
            //        Id = IdGiver++
            //    }

            //    DirectoryInfo b = new DirectoryInfo("ClientApp/src/music");
            //    FileInfo[] Files = b.GetFiles("*.mp3").OrderBy(a => a.CreationTime).ToArray();
            //    foreach (FileInfo File in Files)
            //    {

            //    }

            //}

            return Playlists.playlists;
        }

    }
}
