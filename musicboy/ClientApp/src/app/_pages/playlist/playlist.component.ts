import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/_services/player.service';

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
    private playerSer: PlayerService
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
}
