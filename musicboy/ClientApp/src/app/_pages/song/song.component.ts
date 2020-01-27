import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  album;
  selected;

  constructor(
    private route: ActivatedRoute,
    private playerSer: PlayerService
  ) {
    this.route.params.subscribe(params => {
      this.album = this.route.snapshot.data['album'];
      this.selected = params['id'];

      for (let i = 0; i < this.album.songs.length; i++) {
        if (this.selected == this.album.songs[i].id) {
          this.playerSer.playTrack(this.album.songs[i].path)
        }
      }

      this.playerSer.nextSong(this.album.next.id)
      this.playerSer.prevSong(this.album.previous.id)
    });
  }

  ngOnInit() {
  }
}
