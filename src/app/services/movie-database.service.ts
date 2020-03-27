import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPelicula } from 'src/models/pelicula.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IActor } from 'src/models/actor.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieDatabaseService {

  constructor(private http: HttpClient) { }

  _Params =
    {
      'apiKey': '?api_key=' + environment.apiKey,
      'lang': '&language=es',
      'region': '&region=ES'

    };

  getNowPlaying(): Observable<IPelicula[]> {
    // GET
    // /movie/now_playing
    // Get a list of movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.  
    // You can optionally specify a region prameter which will narrow the search to only look for theatrical release dates within the specified country.

    const _EndPoint: string = '/movie/now_playing'

    return this.http.get<IPelicula[]>(environment.apiUrl + _EndPoint + this._Params.apiKey + this._Params.lang + this._Params.region);
  }

  getActors(pelicula: IPelicula):Observable<IActor[]> {
    //     Get Credits
    // GET
    // /movie/{movie_id}/credits
    // Get the cast and crew for a movie.

    const _EndPoint: string = '/movie/' + pelicula.id + '/credits';

    return this.http.get<IActor[]>(environment.apiUrl + _EndPoint + this._Params.apiKey + this._Params.lang + this._Params.region);

  }

}
