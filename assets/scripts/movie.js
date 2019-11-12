import { addHeader, resolveImagePath, resolveGenres, attachCarousel, supportsImports } from "./common.js";
import API from './api.js';
import VARIABLES from './variables.js';
import "./rating.js";
import "./movie-detail.js";
import "./carousel.js";
import "./card.js"
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
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    API.call(VARIABLES.MOVIE + movieId, { append_to_response: "credits" })
        .then(movie => {
            let movieDetail = document.createElement("movie-detail");
            movieDetail.innerHTML = `<span slot="movie-detail-title">${movie.title}</span>
      <img slot="movie-detail-image" src="${resolveImagePath(movie.backdrop_path, 'original')}" class="movie-detail-posterimage" width="100%" />
    <span slot="movie-detail-description">${movie.overview}</span>
      <span slot="movie-genres">${movie.genres.map(genre => genre.name).join(", ")}</span>
     <span slot="movie-cast">${movie.credits.cast.map(actor => `<a href="actor.html?id=${actor.id}" class="movie-cast-link">${actor.name}</a>`)}</span>
     <span slot="movie-director">${movie.credits.crew.find(actor => actor.job === "Director").name}</span></a>
   <movie-rating slot="movie-rating"  rating="${movie.vote_average}"></movie-rating>`;

            document.getElementById("movie").appendChild(movieDetail);
        })

    const genres = await API.call(VARIABLES.GENRES).then(resolveGenres);
    const relatedMovies = await API.call(VARIABLES.MOVIE + movieId + '/similar', { include_adult: false });
    if (relatedMovies.results.length)
        attachCarousel("related-movies", relatedMovies.results, { id: 'related', title: 'Related Movies', genres });


}
