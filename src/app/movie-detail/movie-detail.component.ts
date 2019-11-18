import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: string;
  src = "https://image.tmdb.org/t/p/w500/";
  get selectedMovieData() { return this.dataService.selectedMovieData; }
  get similiarMovieData() { return this.dataService.similiarMovieData; }

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.dataService.getMovieDetail(this.movieId);
    this.dataService.getSimiliarMovies(this.movieId);
  }

  gotomovie(movieId: string) {
    this.router.navigate(['../' + movieId]);
    this.dataService.getMovieDetail(movieId);
    this.dataService.getSimiliarMovies(movieId);
  }
}
