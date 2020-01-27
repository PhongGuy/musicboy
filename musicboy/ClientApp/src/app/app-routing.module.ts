import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { SongComponent } from './_pages/song/song.component';
import { SongResolver } from './_pages/song/song.resolver';
import { PlaylistsComponent } from './_pages/playlists/playlists.component';
import { PlaylistsResolver } from './_pages/playlists/playlists.resolver';
import { PlaylistResolver } from './_pages/playlist/playlist.resolver';
import { PlaylistComponent } from './_pages/playlist/playlist.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "song/:id",
    component: SongComponent,
    resolve: {
      album: SongResolver
    }
  },
  {
    path: "playlist/:id",
    component: PlaylistComponent,
    resolve: {
      playlist: PlaylistResolver
    }
  },
  {
    path: "playlist/:id/:song",
    component: PlaylistComponent,
    resolve: {
      playlist: PlaylistResolver
    }
  },
  {
    path: "playlists",
    component: PlaylistsComponent,
    resolve: {
      playlists: PlaylistsResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
