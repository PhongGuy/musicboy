import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  playlists;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.playlists = this.route.snapshot.data['playlists'];
    });
  }

  ngOnInit() {
  }

}
