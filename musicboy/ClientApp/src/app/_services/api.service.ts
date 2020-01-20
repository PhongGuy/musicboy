import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  private sendIMG: Subscription;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) { }

  /**
   * Constructs a `GET` request that interprets the body as a text string and
   * returns the response as a string value.
   *
   * @param url The endpoint URL.
   */
  get(url: any) {
    return this.http.get(url);
  }

  /**
   * Constructs a `POST` request that interprets the body as a JSON object and
   * returns the response body as a JSON object.
   *
   * @param data data to send to the API
   */
  send(data: any) {
    return this.http.post(
      environment.apiURL,
      data,
      {
        "withCredentials": true,
        "headers": {
          'Content-Type': 'text/plain'
        }
      });
  }

  /**
   * Gets the team from the API
   *
   * @param id teamid
   */
  getTeam(id: any) {
    return this.send({
      "action": "teams/get",
      "team": id
    })
  }

  /**
   * Sends a `POST` request to the API and check if the current user is logged
   * ind. It will respond with the user and `active`: boolean.
   */
  checkLogin() {
    return this.send({ "action": "users/checkLogin" });
  }

  /**
   * Sends a `GET` request to the `logs.tf` API with steamid and offset. This
   * will give array response
   *
   * @param steamid user steamid
   * @param offset number of already loaded
   */
  userLogs(steamid, offset = null) {
    return this.http.get('https://logs.tf/api/v1/log?player=' + steamid + '&limit=20&offset=' + offset)
  }

  /**
   * Sends a `GET` request to the `demo.tf` API. This will give array response.
   *
   * @param steamid user steamid
   * @param page number of pages that has been loaded already
   */
  userDemos(steamid, page) {
    return this.http.get('https://api.demos.tf/demos?players%5B%5D=' + steamid + '&page=' + page)
  }

  failed(data: any) {
    this.snack.open('We experienced an error, the error was noted and send for debugging. (this is a lie.. so far..)')
  }


  fileUpload(event: any) {
    this.sendSnack();
    var file: File = event.target.files[0];
    if (file == undefined) {
      this.snack.open('There is no file selected')
      return;
    }
    var match = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];
    if (!match.includes(file.type)) {
      this.snack.open('Image has to be PNG, JPG, JPEG or WEBP!');
    } else {
      const data = new FormData();
      data.append('image_upload', file);
      return this.http.post(environment.apiURL, data, { "withCredentials": true });
    }
  }

  sendSnack() {
    let a = this.snack.open('Uploading...', 'Cancel', {
      duration: 0
    });
    a.onAction().subscribe((data: any) => {
      if (this.sendIMG)
        this.sendIMG.unsubscribe();
      this.snack.open('Image upload was canceled')
    })
  }
}
