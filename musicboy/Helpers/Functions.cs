using musicboy.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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
            int PlaylistId = 1;

            DirectoryInfo d = new DirectoryInfo("ClientApp/src/music/playlists");
            DirectoryInfo[] playlists = d.GetDirectories().Where(a => a.Name != "RANDOM_PLAYLIST").OrderBy(a => a.CreationTime).ToArray();
            foreach (DirectoryInfo playlist in playlists)
            {
                int SongId = 1;

                var p = new Playlist{
                    Id = PlaylistId++,
                    Songs = new List<Song>(),
                    Name = playlist.Name
                };

                double duration = 0;

                DirectoryInfo b = new DirectoryInfo("ClientApp/src/music/playlists/" + playlist.Name);
                FileInfo[] Files = b.GetFiles("*.mp3").OrderBy(a => a.CreationTime).ToArray();
                foreach (FileInfo File in Files)
                {

                    TagLib.File songInfo = TagLib.File.Create(File.FullName);

                    Song song = new Song
                    {
                        Id = SongId++,
                        Track = songInfo.Tag.Track,
                        Year = songInfo.Tag.Year,
                        Title = songInfo.Tag.Title,
                        Album = songInfo.Tag.Album,
                        Artist = songInfo.Tag.FirstPerformer,
                        Duration = songInfo.Properties.Duration,
                        Path = "/music/playlists/"+ playlist.Name+"/" + File.Name,
                        Genre = songInfo.Tag.FirstGenre
                    };

                    duration += Math.Floor(song.Duration.TotalSeconds);

                    if (songInfo.Tag.Pictures.Length > 0)
                    {
                        var imgBytes = songInfo.Tag.Pictures[0].Data.Data;
                        song.Picture = "data:image/png;base64," + Convert.ToBase64String(imgBytes);
                    }

                    p.Songs.Add(song);
                }

                var time = TimeSpan.FromSeconds(duration);
                p.Duration = time.ToString("c");

                Playlists.playlists.Add(p);

            }

            return Playlists.playlists;
        }

    }
}
