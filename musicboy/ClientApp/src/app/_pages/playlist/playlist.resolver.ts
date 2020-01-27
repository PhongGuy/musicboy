import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PlaylistResolver implements Resolve<any> {

    constructor(
        private http: HttpClient
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        let id = route.paramMap.get('id');
        let song = route.paramMap.get('song');
        var href = "/api/Playlist/" + id;

        if (song)
            href += "/" + song;

        return this.http.get(href).pipe(
            map(data => data),
            catchError((err) => Observable.throw(err.json().error))
        )
    }
}
