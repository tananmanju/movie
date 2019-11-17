// const API_KEY = "8441a5264ec7146ab1efd03895169958";
// import { getMovieItem } from "./card.js";
// let genres = {};
// function getGenres() {
//     return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
//         .then(res => res.json())
// }

// getGenres().then(genreData => {
//     genres = genreData.genres.reduce(function (acc, item) {
//         acc[item.id] = item.name;
//         return acc;
//     }, {});
// })

// function link(ev) {
//     console.log(ev)
//     ev.preventDefault();
//     let queryData = document.getElementById('link_id').value;
//     console.log(queryData);
//     return fetch(`https://api.themoviedb.org/3/search/movie?api_key=8441a5264ec7146ab1efd03895169958&language=en-US&query=${queryData}&page=1&include_adult=false`)
//         .then(response => {
//             return response.json();
//         })
//         .then(response => {
//             console.log(response);
//             let items = response.results.map(movie => {
//                 if(movie.genre_ids){
//                     movie.genres = movie.genre_ids.map(genre_id => {
//                         return genres[genre_id]
//                     });
//                 }
//                 else {
//                     movie.genres = [];
//                 }

//                 return getMovieItem(movie)
//             });

//             document.getElementById("search-items").innerHTML = items.join("");
//         });


// }
// const form = document.getElementById('search');
// form.addEventListener("submit", link)

import { addHeader, resolveImagePath, resolveGenres, supportsImports } from "./common.js";
import API from '../scripts/api.js';
import VARIABLES from '../scripts/variables.js';
import "./card.js";
import "./rating.js";
// import "../../index.js";



if (supportsImports()) {
    addHeader();
    init();

} else {
    window.addEventListener('HTMLImportsLoaded', function (e) {
        addHeader();
        init();

    });
}

async function resolveData(){
    if(localStorage.getItem('movieData')) return;
    const genresResponse = await API.call(VARIABLES.GENRES)
    const genres = resolveGenres(genresResponse);
    console.log("genreds",genres);
    const latestMovies = await API.call(VARIABLES.LATEST, { include_adult: false });
    const trendingMovies = await API.call(VARIABLES.TRENDING);
    const popularMovies = await API.call(VARIABLES.POPULAR);
    let allMoviesData = [...latestMovies.results, ...trendingMovies.results, ...popularMovies.results];

    const movieObject = {};
    for (const movie of allMoviesData) {
        movieObject[movie.id] = movie;
    }

    let movieArray = [];
    for (const key in movieObject) {
        movieArray.push(movieObject[key]);
    }

    localStorage.setItem('movieData', JSON.stringify(movieArray));
    localStorage.setItem('movieGenres', JSON.stringify(genres));
}

async function init(event) {
    await resolveData();
    console.log(event);
    if (event && event.type === "submit") event.preventDefault();
    let queryData = document.getElementById('link_id').value;
    if (event && event.type === "keyup" && event.keyCode >= 65 && event.keyCode <= 90){
        queryData = event.target.value;
    }
    let popularity = document.getElementById('popularity').value;
    console.log(queryData, popularity);
    //const genres = await API.call(VARIABLES.GENRES).then(resolveGenres);
    //const searchData = await API.call(VARIABLES.SEARCH,{query:queryData});
    //console.log(searchData.results);
    const allMovies = JSON.parse(localStorage.getItem('movieData'));
    const genres = JSON.parse(localStorage.getItem('movieGenres'));
    let selectedMovies = allMovies.filter(function (item) {
        return item.title.toLowerCase().startsWith(queryData.toLowerCase()) && item.popularity >= popularity;
    });
    // if (!queryData) selectedMovies = allMovies;
    document.getElementById("search-items").innerHTML = '';

    setTimeout(() => {
        for (let values of selectedMovies) {
            let elementData = document.createElement("movie-card");
            elementData.innerHTML = ` ${values.backdrop_path ? `<img slot="movie-image" src="${resolveImagePath(values.backdrop_path)}"  alt="movie-image" class="card-image"
       title="movie-image" />` : `<img slot="movie-image" src="assets/images/320x170.png"  alt="movie-image" class="card-image"
       title="movie-image" />`}
                  <span slot="movie-title">${values.title}</span>
                  ${values.popularity > 150 ? '<i slot="movie-popularity" class="fa fa-heart red card-heart"></i>' : '<i slot="movie-popularity" class="fa fa-heart card-heart"></i>'}
                  <span slot="movie-genres">${values.genre_ids.map(id => genres[id])}</span>
                  <movie-rating rating="${values.vote_average}" slot="movie-rating"></movie-rating>
                  <a slot="movie-show-more" href="/movie.html?id=${values.id}" class="show-more">Show more</a>`;
            document.getElementById("search-items").appendChild(elementData);

        }

    }, 1000);


}
const form = document.getElementById('search');
form.addEventListener("submit", init);
const range = document.querySelector('input[type=range]');
range.addEventListener("change", init);
const userInput = document.querySelector('#link_id');
userInput.addEventListener("keyup", init);
//  const dataValue = JSON.parse(localStorage.getItem('movieData'));
//     console.log("datavalue1",dataValue);


