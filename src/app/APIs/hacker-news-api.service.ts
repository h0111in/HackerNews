import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NewsItem } from './news-item';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService {


  private path = 'https://hacker-news.firebaseio.com/v0';
  constructor(private http: HttpClient) { }


  public getTopStoryIds(top = 5): Observable<number[]> {

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      ;
    return this.http.get(this.path + '/topstories.json', { headers })
    .pipe(map((data: any) => data ? data.slice(0, top) : [])
    , catchError(this.handleError));
  }

  public getNewsItem(id: number): Observable<NewsItem> {

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      ;
    return this.http.get(this.path + '/item/' + id + '.json', { headers })
    .pipe(map((data: any) => new NewsItem().fromJSON(data),
    catchError(this.handleError)));
  }



  private handleError(err: HttpErrorResponse | any): Observable<never> {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

}
