const API_KEY = "8441a5264ec7146ab1efd03895169958";
import { getMovieItem } from "./card.js";
let genres = {};
function getGenres() {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(res => res.json())
}

getGenres().then(genreData => {
    genres = genreData.genres.reduce(function (acc, item) {
        acc[item.id] = item.name;
        return acc;
    }, {});
})

function link(ev) {
    console.log(ev)
    ev.preventDefault();
    let queryData = document.getElementById('link_id').value;
    console.log(queryData);
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=8441a5264ec7146ab1efd03895169958&language=en-US&query=${queryData}&page=1&include_adult=false`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            let items = response.results.map(movie => {
                if(movie.genre_ids){
                    movie.genres = movie.genre_ids.map(genre_id => {
                        return genres[genre_id]
                    });
                }
                else {
                    movie.genres = [];
                }
                
                return getMovieItem(movie)
            });

            document.getElementById("search-items").innerHTML = items.join("");
        });


}
const form = document.getElementById('search');
form.addEventListener("submit", link)