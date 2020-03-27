import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieDatabaseService } from 'src/app/services/movie-database.service';
import { IPelicula } from 'src/models/pelicula.interface';
import {IonSlides  } from '@ionic/angular';
import { IActor } from 'src/models/actor.interface';


@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})


export class PeliculasPage implements OnInit {

  @ViewChild('slidePeliculas', {static: true}) slidePeliculas: IonSlides;
  @ViewChild('slideActores', {static: true}) slideActores: IonSlides;


  constructor(private MovieDB: MovieDatabaseService) { }

  slideOptsPeliculas = {
    initialSlide: 0,
    speed: 500,
    slideShadows: true,
    slidesPerView:1.2

  };

  slideOptsActores = {
    initialSlide: 1.5,
    slidesPerView: 3,
    speed: 400,
    slideShadows: true,

  };

  peliculas: IPelicula[] = [];
  actores: IActor[] = [];
  peliculaSeleccionada: IPelicula = <IPelicula>{};

  ngOnInit() {

    this.getNowPlaying();
  }

  getNowPlaying() {

    this.MovieDB.getNowPlaying().subscribe(
    
        res => {
          this.peliculas = res['results'];
        console.log(this.peliculas);
        }
    );
  }

  getCredits(pelicula: IPelicula){
    this.MovieDB.getActors(pelicula).subscribe (
      res=>{
        this.actores = res['cast'];
        console.log(this.actores);
      });
    
  }

  showActors(event){
    this.slidePeliculas.getActiveIndex().then(x => {
      this.peliculaSeleccionada= this.peliculas[x];
      this.slideActores.slideTo(0);

      this.getCredits(this.peliculaSeleccionada);

    });
  }

}
