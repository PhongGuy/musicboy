import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/_services/player.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DeleteComponent } from './delete/delete.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlist;
  selected;

  constructor(
    private route: ActivatedRoute,
    private playerSer: PlayerService,
    private dialog: MatDialog,
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      console.log(params)
      this.playlist = this.route.snapshot.data['playlist'];
      this.selected = params['song'];

      if (this.selected) {

        for (let i = 0; i < this.playlist.songs.length; i++) {
          if (this.selected == this.playlist.songs[i].id) {
            this.playerSer.playTrack(this.playlist.songs[i].path)
          }
        }

        this.playerSer.nextSong("/playlist/" + this.playlist.id + "/" + this.playlist.next.id)
        this.playerSer.prevSong("/playlist/" + this.playlist.id + "/" + this.playlist.previous.id)
      }

    });
  }

  ngOnInit() {
  }

  delete(id: string) {
    let d = this.dialog.open(DeleteComponent, {
      width: "300px"
    })

    d.afterClosed().subscribe(a => {
      if (a) {
        this.http.delete('api/Playlist/' + id).subscribe(b => {
          if (b) {
            this.snack.open('Playlist was deleted');
            this.router.navigateByUrl('/playlists');
          } else {
            this.snack.open('Playlist was not deleted, there was an error');
          }
        })
      }
    })
  }
}
