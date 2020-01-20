import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconRegistry, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { icons } from './_mock/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private snack: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    /**
     * We get the icons from the mock and include them in the project.
     */
    for (let i = 0; i < icons.length; i++) {
      this.matIconRegistry.addSvgIcon(
        icons[i],
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/' + icons[i] + '-24px.svg'));

    }
  }

  /**
   * First we make sure the header is fixed and then we start a global socket so
   * if there are any page updates we can send them to all users.
   */
  ngOnInit() {

  }
}
