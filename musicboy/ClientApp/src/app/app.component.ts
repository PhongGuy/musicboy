import { Component, OnInit } from '@angular/core';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { icons } from './_mock/icons';
import { RandomPlaylistComponent } from './_components/random-playlist/random-playlist.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {

    for (let i = 0; i < icons.length; i++) {
      this.matIconRegistry.addSvgIcon(
        icons[i],
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/' + icons[i] + '-24px.svg'));

    }
  }

  ngOnInit() {
  }

  random() {
    let a = this.dialog.open(RandomPlaylistComponent, {
      width: "600px"
    });

    a.afterClosed().subscribe(b => {
      if (b != null && b != false) {
        this.http.get('api/RandomPlaylist/' + encodeURI(b)).subscribe(b => {
          console.log(b)
          this.router.navigateByUrl('/playlist/' + b);
        })
      }
    })
  }
}
