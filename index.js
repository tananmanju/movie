"use strict";

import { addHeader,loadTemplate, attachCarousel, resolveGenres, supportsImports } from "./assets/scripts/common.js";
import API from './assets/scripts/api.js';
import VARIABLES from './assets/scripts/variables.js';
import './assets/scripts/carousel.js';
import './assets/scripts/card.js';
import './assets/scripts/rating.js';
import './assets/scripts/modal.js';



if (supportsImports()) {
    addHeader();
    init()
} else {
    window.addEventListener('HTMLImportsLoaded', function (e) {
        addHeader();
        init()
    });
}

async function init() {
    //Fetch Data
    const genresResponse = await API.call(VARIABLES.GENRES)
    const genres = resolveGenres(genresResponse);
    const latestMovies = await API.call(VARIABLES.LATEST, { include_adult: false });
    const trendingMovies = await API.call(VARIABLES.TRENDING);
    const popularMovies = await API.call(VARIABLES.POPULAR);

    // console.log(allMoviesData);
    //Adding the Carousel Function
    attachCarousel('latest-movies', latestMovies.results, { id: 'latest', title: 'Latest', genres });
    attachCarousel('trending-movies', trendingMovies.results, { id: 'trending', title: 'Trending', genres });
    attachCarousel('popular-movies', popularMovies.results, { id: 'popular', title: 'Popular', genres });
    let allMoviesData = [...latestMovies.results, ...trendingMovies.results, ...popularMovies.results];

    //sort the Movie Data in Before Set in  LocalStorage
    const movieObject = {};
    for (const movie of allMoviesData) {
        movieObject[movie.id] = movie;
    }

    let movieArray = [];
    for (const key in movieObject) {
        movieArray.push(movieObject[key]);
    }

   //SetLocal Storage Data Of Movie Data and Genres
    localStorage.setItem('movieData', JSON.stringify(movieArray));
    localStorage.setItem('movieGenres', JSON.stringify(genres));
  }