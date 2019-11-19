import { addHeader, resolveImagePath, resolveGenres, supportsImports } from "./common.js";
import API from '../scripts/api.js';
import VARIABLES from '../scripts/variables.js';
import "./card.js";
import "./rating.js";


if (supportsImports()) {
    addHeader();
    init();

} else {
    window.addEventListener('HTMLImportsLoaded', function (e) {
        addHeader();
        init();

    });
}

async function resolveData() {
    if (localStorage.getItem('movieData')) return;
    const genresResponse = await API.call(VARIABLES.GENRES)
    const genres = resolveGenres(genresResponse);
    console.log("genreds", genres);
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
    return Promise.resolve();
}

async function init(event) {
    await resolveData();
    
    if (event && event.type === "submit") event.preventDefault();
    let queryData = document.getElementById('search-value').value;
    if (event && event.type === "keyup" && event.keyCode >= 65 && event.keyCode <= 90) {
        queryData = event.target.value;
    }
    let popularity = document.getElementById('popularity').value;

    const allMovies = JSON.parse(localStorage.getItem('movieData'));

    //action -> movies with genres action
    //act -> movies startswith title


    const genres = JSON.parse(localStorage.getItem('movieGenres'));

    const values = Object.values(genres);
    const keys = Object.keys(genres);

    const genredData = {};
    for (let i = 0; i < values.length; i++) {
        genredData[values[i].toLowerCase()] = keys[i];
    }

    let selectedMovies = allMovies.filter(function (item) {

        const query = queryData.toLowerCase();
        const title = item.title.toLowerCase();
        //queryData is genres or not
       
        if (genredData[query]) {
            //querydata is genres
            //get genreid
            const selectedGenreId = genredData[query];
            //movies with genreid
            return item.genre_ids.includes(parseInt(selectedGenreId));
        } else {
            return title.startsWith(query) && parseFloat(item.vote_average) >= popularity;
        }
    });
    //Show Total Result Score
    let searchCount = document.getElementById("search-result-count");
    searchCount.innerHTML = `Results Count - ${selectedMovies.length}`
    document.getElementById("search-items").innerHTML = '';
    //Show Search Card
   
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

    }, 100);


}
//Add Events
const form = document.getElementById('search');
form.addEventListener("submit", init);
const range = document.querySelector('input[type=range]');
range.addEventListener("change", init);
const userInput = document.querySelector('#search-value');
userInput.addEventListener("keyup", init);


