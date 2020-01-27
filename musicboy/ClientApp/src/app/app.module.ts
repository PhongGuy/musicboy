import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_MENU_DEFAULT_OPTIONS, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MarkdownModule } from 'ngx-markdown';
import { NgxPopperModule } from 'ngx-popper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { HomeComponent } from './_pages/home/home.component';
import { SongComponent } from './_pages/song/song.component';
import { PlayerComponent } from './_components/player/player.component';
import { PlaylistsComponent } from './_pages/playlists/playlists.component';
import { RandomPlaylistComponent } from './_components/random-playlist/random-playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongComponent,
    PlayerComponent,
    PlaylistsComponent,
    RandomPlaylistComponent,
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPopperModule.forRoot({}),
    MarkdownModule.forRoot({ loader: HttpClient }),
    LoadingBarRouterModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000, horizontalPosition: "left" } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { width: "auto", hasBackdrop: true } },
    { provide: MAT_MENU_DEFAULT_OPTIONS, useValue: { xPosition: "before" } },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RandomPlaylistComponent
  ]
})
export class AppModule {
}
