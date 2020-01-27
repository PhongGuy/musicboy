import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/_services/player.service';
import * as wavesurfer from 'wavesurfer.js';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @ViewChild('player', { static: true })
  playerRef;
  player: HTMLAudioElement;

  state: string = 'pause';
  mouseDown: boolean;
  coolGuyMode: boolean = false;

  nextSong;
  prevSong;

  songVolume: number = 75;
  volumeIcon: string = 'volume_up';

  currenturl: string;

  songLength
  songCurrent

  progressbar: number = 0;

  constructor(
    private playerSer: PlayerService
  ) {

    playerSer.playTrack$.subscribe(previewUrl => {
      this.playTrack(previewUrl);
    });
    playerSer.pauseTrack$.subscribe(() => {
      this.pauseTrack();
    });
    playerSer.nextSong$.subscribe(a => {
      this.nextSong = a;
    });
    playerSer.prevSong$.subscribe(a => {
      this.prevSong = a;
    });

    document.body.onmousedown = () => {
      this.mouseDown = true;
    }
    document.body.onmouseup = () => {
      this.mouseDown = false;
    }
  }

  ngOnInit() {
    this.player = this.playerRef.nativeElement;

    this.player.ontimeupdate = () => {
      if (!this.mouseDown) {
        this.progressbar = (this.player.currentTime / this.player.duration) * 100;
        this.songCurrent = this.milisecToHuman(this.player.currentTime)
        this.songLength = this.milisecToHuman(this.player.duration)
      }
    }

    this.player.addEventListener('pause', () => {
      this.state = 'pause';
    });
    this.player.addEventListener('play', () => {
      this.state = 'play';
    });
    this.player.addEventListener('playing', () => {
      this.state = 'playing';
    });
    this.player.addEventListener('volumechange', () => {
      if (this.player.muted) {
        this.volumeIcon = 'volume_off';
        this.songVolume = 0;

      } else {

        this.songVolume = this.player.volume * 100;


        if (this.songVolume <= 50) {
          this.volumeIcon = 'volume_down';
        } else {
          this.volumeIcon = 'volume_up';
        }

        if (this.songVolume == 0) {
          this.volumeIcon = 'volume_off';
        }
      }
    });
  }

  playTrack(previewUrl = null) {
    if (previewUrl != null) {
      this.player.src = previewUrl;
      this.progressbar = 0;
    }
    this.player.play();
  }

  pauseTrack() {
    this.player.pause();
  }

  playerEnded() {
    this.playerSer.trackEnded();
  }

  updateSong(e: any) {
    this.player.currentTime = (this.player.duration / 100) * e.value;
  }

  calculateChange(e: any) {
    var pt = (this.player.duration / 100) * e.value;
    this.songCurrent = this.milisecToHuman(pt);
  }

  volume(e: any) {
    this.player.volume = e.value / 100;
  }

  toogleMute() {
    this.player.muted = !this.player.muted;
  }

  toggleCoolGuyMode() {
    this.coolGuyMode = !this.coolGuyMode;
    if (this.coolGuyMode) {
      var x = wavesurfer.create({
        container: document.getElementById('waveform'),
        waveColor: 'violet',
        progressColor: 'purple'
      });

      x.load(this.player.src);

      x.on('ready', function () {
        wavesurfer.play();
      });
    }
  }

  private milisecToHuman(q) {

    var mm = parseInt((q / 60).toString(), 10);
    var ss = parseInt((q % 60).toString());

    var m = (mm < 10) ? "0" + mm : mm;
    var s = (ss < 10) ? "0" + ss : ss;

    return m + ":" + s
  }
}
