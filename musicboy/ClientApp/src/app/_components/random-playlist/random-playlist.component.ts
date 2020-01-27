import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './random-playlist.component.html',
  styleUrls: ['./random-playlist.component.scss']
})
export class RandomPlaylistComponent implements OnInit {

  songs;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.newPlaylist();
  }

  newPlaylist() {
    this.http.get('/api/RandomPlaylist').subscribe(a => {
      this.songs = a;
    }, a => {
      let s = this.snack.open(a.statusText, 'Retry');
      s.onAction().subscribe(b => {
        this.newPlaylist();
      })
    })
  }

}
