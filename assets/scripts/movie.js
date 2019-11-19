import { addHeader, resolveImagePath, resolveGenres, attachCarousel, supportsImports, searchParamUrl } from "./common.js";
import API from './api.js';
import VARIABLES from './variables.js';
import "./rating.js";
import "./movie-detail.js";
import "./carousel.js";
import "./card.js";
import "./modal.js"

if (supportsImports()) {
    addHeader();
    init();

} else {
    window.addEventListener('HTMLImportsLoaded', function (e) {
        addHeader();
        init();

    });
}

async function init() {
    const movieId = searchParamUrl();
    API.call(VARIABLES.MOVIE + movieId, { append_to_response: "credits" })
        .then(movie => {
            let movieDetail = document.createElement("movie-detail");
            movieDetail.movie = movie;
            movieDetail.innerHTML = `<span slot="movie-detail-title">${movie.title}</span>
      <img slot="movie-detail-image" src="${resolveImagePath(movie.backdrop_path, 'original')}" class="movie-detail-posterimage" />
      <span slot="movie-detail-description">${movie.overview}</span>
      <span slot="movie-genres">${movie.genres.map(genre => genre.name).join(",  ")}</span>
      <span slot="movie-cast">${movie.credits.cast.map(actor => `<a href="actor.html?id=${actor.id}" class="movie-cast-link">${actor.name}</a>`).join(",  ")}</span>
      <span slot="movie-director">${movie.credits.crew.find(actor => actor.job === "Director").name}</span></a>
      <movie-rating slot="movie-rating"  rating="${movie.vote_average}"></movie-rating>`;

            document.getElementById("movie").appendChild(movieDetail);
        })

    const genres = await API.call(VARIABLES.GENRES).then(resolveGenres);
    const relatedMovies = await API.call(VARIABLES.MOVIE + movieId + '/similar', { include_adult: false });
    if (relatedMovies.results.length) {
        attachCarousel("related-movies", relatedMovies.results, { id: 'related', title: 'Related Movies', genres });
    }
}
