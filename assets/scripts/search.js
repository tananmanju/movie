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
import "./rating.js"



if (supportsImports()) {
    addHeader();
    init();

} else {
    window.addEventListener('HTMLImportsLoaded', function (e) {
        addHeader();
        init();

    });
}

async function  init(event){
    console.log(event);
    if(event) event.preventDefault();
    let queryData = document.getElementById('link_id').value;
     console.log(queryData);
    const genres = await API.call(VARIABLES.GENRES).then(resolveGenres);
    const searchData = await API.call(VARIABLES.SEARCH,{query:queryData});
    console.log(searchData.results);
    document.getElementById("search-items").innerHTML = '';
   for(let values of searchData.results){
       console.log(values);
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

}
const form = document.getElementById('search');
 form.addEventListener("submit", init)

