"use strict";

import {addHeader, attachCarousel, resolveGenres, supportsImports} from "./assets/scripts/common.js";
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
    const genres = await API.call(VARIABLES.GENRES).then(resolveGenres);
    const latestMovies = await API.call(VARIABLES.LATEST, {include_adult: false});
    const trendingMovies = await API.call(VARIABLES.TRENDING);
    const popularMovies = await API.call(VARIABLES.POPULAR);
    attachCarousel('latest-movies', latestMovies.results, {id: 'latest', title: 'Latest', genres});
    attachCarousel('trending-movies', trendingMovies.results, {id: 'trending', title: 'Trending', genres});
    attachCarousel('popular-movies', popularMovies.results, {id: 'popular', title: 'Popular', genres});
}
