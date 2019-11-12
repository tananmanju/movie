import { getCarousel, productScroll } from './carousel.js';
import { rating } from "./rating.js";

//find the id from the url
const urlParams = new URLSearchParams(window.location.search);
const API_KEY = "8441a5264ec7146ab1efd03895169958";
const movieId = urlParams.get('id');
const movieImage_Base = "https://image.tmdb.org/t/p/original/";
//fetch the single movie details 
function getMovieData() {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8441a5264ec7146ab1efd03895169958&language=en-US&append_to_response=credits`)
        .then(response => {
            return response.json();
        })
}

function getRelatedMovie() {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=8441a5264ec7146ab1efd03895169958&language=en-US&page=1`)
        .then(response => {
            return response.json();
        })
}


let linkHeader = document.querySelector('link#header');
console.log("linkHeader", linkHeader);
let header = linkHeader.import.querySelector("header");
console.log("linkHeader", header);
document.getElementById('headerDiv').appendChild(header.cloneNode(true));

getMovieData().then(movie => {
    console.log(movie);

    let movieDetail = document.getElementsByTagName("movie-detail")[0];
    movieDetail.innerHTML = `<span slot="movie-detail-title">${movie.title}</span>
 <img slot="movie-detail-image" src="${movieImage_Base + movie.backdrop_path}" cl1ass="movie-detail-posterimage" width="100%" />
 <span slot="movie-detail-description">${movie.overview}</span>
 <span slot="movie-genres">${movie.genres.map(genre => genre.name)}</span>
 <span slot="movie-cast">${movie.credits.cast.map(actor => `<a href="actor.html?id=${actor.id}" class="movie-cast-link">${actor.name}</a>`)}</span>
<span slot="movie-director">${movie.credits.crew.find(actor => actor.job === "Director").name}</span></a>
 <span slot="movie-rating">${rating(movie.vote_average)}</span>`;

})


customElements.define("movie-detail",
    class MovieDetail extends HTMLElement {
        constructor() {
            super();
            let template = document.getElementById("movie-detail").content;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.cloneNode(true));

            //link movie css file
            const linkElement = document.createElement("link");
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', 'assets/styles/movie.css');
            shadowRoot.appendChild(linkElement);

        }
    }
)

let genres;

function getGenres() {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(res => res.json())
}

getGenres().then(genreData => {
    genres = genreData.genres.reduce(function (acc, item) {
        acc[item.id] = item.name;
        return acc;
    }, {});
}).then(getRelatedMovie).then(relatedMovie => {
    console.log(relatedMovie, this);

    document.getElementById('related-movie').innerHTML = getCarousel("related-movie", {
        title: "Related Movies",
        movies: relatedMovie.results,
        genres: genres
    });
    return Promise.resolve();
}).then(() => {
    console.log()
    productScroll("related-movie");
}).catch((err) =>{
    console.log("errr");
})


