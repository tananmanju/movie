//find the id from the url
const urlParams = new URLSearchParams(window.location.search);

const movieId = urlParams.get('id');
 const movieImage_Base = "https://image.tmdb.org/t/p/original/";
//fetch the single movie details 
function getMovieData() {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8441a5264ec7146ab1efd03895169958&language=en-US&append_to_response=credits`)
        .then(response => {
            return response.json();
        })
}


getMovieData().then(movie => {
    console.log(movie);
   
   let movieDetail =  document.getElementsByTagName("movie-detail")[0];
   movieDetail.innerHTML = `<span slot="movie-detail-title">${movie.title}</span>
 <img slot="movie-detail-image" src="${movieImage_Base+movie.backdrop_path}" class="movie-detail-posterimage" width="100%" />`;

})


customElements.define("movie-detail",
class MovieDetail extends HTMLElement{
    constructor(){
        super();
      let template =  document.getElementById("movie-detail").content;
      let shadowRoot = this.attachShadow({mode:'open'});
      shadowRoot.appendChild(template.cloneNode(true));
    }
}
)






