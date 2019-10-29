import { rating } from "./rating.js";

function getImagePath(path) {
    return `https://image.tmdb.org/t/p/w500/${path}`
}

function getMovieItem(movie) {
    return `<div class="card">
           <figure>
                <img src="${getImagePath(movie.poster_path)}" alt="movie-image" title="movie-image"/>
                <figcaption></figcaption>
            </figure>
                <div class="details">
                    <div class="title">
                        <h3>${movie.title}</h3>
                         ${movie.popularity > 150 ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'}
                    </div>
                    <p>${movie.genres.join(", ")}</p>
                    <p>${rating(movie.vote_average)}
                    <a href="" class="show-more">Show more</a></p>
                </div>
            </div>
`
}


export { getMovieItem }
