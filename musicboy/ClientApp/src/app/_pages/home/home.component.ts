import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songs;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    this.http.get('/api/Library').subscribe(a => {
      this.songs = a;
    })
  }

}
