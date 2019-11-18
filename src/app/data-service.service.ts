import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  popularMovieData: any;
  selectedMovieData: any;
  similiarMovieData: any;
  page=1;
  isSearch = false;
  criteria: string;

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number) {
    this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=24fe44a10f3c2fa4d7364af3b34a8f74&language=en-US&page=" + page).subscribe(
      (response) => {
        this.popularMovieData = response;
      })
  }

  getMovieDetail(movieId: string) {
    this.http.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=24fe44a10f3c2fa4d7364af3b34a8f74&language=en-US").subscribe(
      (response) => {
        this.selectedMovieData = response;
      }
    )
  }

  searchMovie(criteria: string, page: number) {
    this.http.get("https://api.themoviedb.org/3/search/movie?api_key=24fe44a10f3c2fa4d7364af3b34a8f74&query=" + criteria + "&page=" + page).subscribe(
      (response) => {
        this.popularMovieData = response;
      }
    )
  }

  getSimiliarMovies(movieId: string) {
    this.http.get("https://api.themoviedb.org/3/movie/" + movieId + "/similar?api_key=24fe44a10f3c2fa4d7364af3b34a8f74").subscribe(
      (response) => {
        this.similiarMovieData = response;
      }
    )
  }
}
