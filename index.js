"use strict";
import { productScroll } from "./assets/scripts/carousel.js";

const API_KEY = "680d339ae650bec42897ef2b4401d0de";
import { getCarousel } from "./assets/scripts/carousel.js";

let genres;

function getGenres() {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(res => res.json())
}

function getLatestMovies() {
    return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`)
        .then(response => {
            return response.json();
        })
}

function getTrendingMovies() {
    return fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
        .then(response => {
            return response.json();
        })
}

function getPopularMovies() {
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => {
            return response.json();
        })
}
function getQuikModal(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8441a5264ec7146ab1efd03895169958&language=en-US&append_to_response=credits`)
        .then(response => {
            return response.json();
        });
}

document.addEventListener('DOMContentLoaded', function(){

setTimeout(function(){
    const all = [];
    all.push(getGenres())
    all.push(getLatestMovies());
    all.push(getTrendingMovies());
    all.push(getPopularMovies());
    console.log(all);
    
    Promise.all(all).then(data => {
        console.log(data);
        const genreData = data.shift();
        genres = genreData.genres.reduce(function (acc, item) {
            acc[item.id] = item.name;
            return acc;
        }, {});
    
    
        const latest = data.shift();
        const trending = data.shift();
        const popular = data.shift();
    
        document.getElementById("latest-movies").innerHTML = getCarousel("latest", {
            title: "Latest",
            movies: latest.results,
            genres: genres
        });
        document.getElementById("trending-movies").innerHTML = getCarousel("trending", {
            title: "Trending",
            movies: trending.results,
            genres
        });
        document.getElementById("popular-movies").innerHTML = getCarousel("popular", {
            title: "Most Watched",
            movies: popular.results,
            genres
        });
        return Promise.resolve();
    }).then(() => {
        productScroll("latest");
        productScroll("trending");
        productScroll("popular");
    }).catch(err => {
        console.error(err)
    });
}, 2000)

}, false);

