import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class SongResolver implements Resolve<any> {

    constructor(
        private http: HttpClient
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        let id = route.paramMap.get('id');

        return this.http.get("/api/Library/" + id).pipe(
            map(data => data),
            catchError((err) => Observable.throw(err.json().error))
        )
    }
}
