import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  get isSearch() { return this.dataService.isSearch; }
  get criteria() { return this.dataService.criteria; }
  get page() { return this.dataService.page; }
  criteriaInput: string;
  pageChange: number;
  src = "https://image.tmdb.org/t/p/w500/";
  get popularMovieData() { return this.dataService.popularMovieData; }

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.criteriaInput = this.criteria;
    if (!this.isSearch) {
      this.dataService.getPopularMovies(this.page);
    } else {
      this.dataService.searchMovie(this.criteria, this.page)
    }
  }

  gotoDetail(movieId: string) {
    this.router.navigate(['/' + movieId]);
  }

  nextPage(pageNo: number) {
    if (isNaN(pageNo)) {
      this.pageChange = this.page;
      return
    }
    if (pageNo < 1 || pageNo > +this.popularMovieData.total_pages) {
      this.pageChange = this.page;
      return
    }
    this.dataService.page = pageNo;
    if (!this.isSearch) {
      this.dataService.getPopularMovies(this.page);
    } else {
      this.dataService.searchMovie(this.criteria, this.page)
    }
  }

  search() {
    if (!this.criteriaInput) {
      this.dataService.isSearch = false;
      this.dataService.page = 1;
      this.dataService.criteria = "";
      this.dataService.getPopularMovies(this.page);
    } else {
      this.dataService.criteria = this.criteriaInput;
      this.dataService.isSearch = true;
      this.dataService.page = 1;
      this.dataService.searchMovie(this.criteria, this.page);
    }
  }
}
