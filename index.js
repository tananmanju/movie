"use strict";
import { productScroll } from "./assets/scripts/carousel.js";
import { getCarousel } from "./assets/scripts/carousel.js";

import API from './assets/scripts/apis.js';
import URLS from './assets/scripts/api_urls.js';

let genres;

function getGenres() {
    return API.call(URLS.genres)
}

function getLatestMovies() {
    return API.call(URLS.latestMovies, { language: 'en-US', include_adult: false })
}

function getTrendingMovies() {
    return API.call(URLS.trendingMovies);
}

function getPopularMovies() {
    return API.call(URLS.popularMovies, { language: 'en-US', page: 1 })
}
function getQuikModal(id) {
    return API.call(URLS.getMovie + id, { language: 'en-US', append_to_response: 'credits' });
}

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

