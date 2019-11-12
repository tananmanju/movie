import { rating } from "./rating.js";

function getImagePath(path) {
    return `https://image.tmdb.org/t/p/w500/${path}`
}

function getMovieItem(movie) {
    return `<movie-card id="${movie.id}">
    ${movie.backdrop_path ? `<img slot="movie-image" src="${getImagePath(movie.backdrop_path)}"  alt="movie-image" class="card-image"
    title="movie-image" />` : `<img slot="movie-image" src="assets/images/320x170.png"  alt="movie-image" class="card-image"
    title="movie-image" />`}
    <span slot="movie-title">${movie.title}</span>
    ${movie.popularity > 150 ? '<i slot="movie-popularity" class="fa fa-heart movie-card__heart fas-heart"></i>' : '<i slot="movie-popularity" class="fa fa-heart movie-card__heart"></i>'}
    <span slot="movie-genres">${movie.genres.join(", ")}</span>
    <span slot="movie-rating"> ${rating(movie.vote_average)}</span>
    <a slot="movie-show-more" href="movie.html?id=${movie.id}" >Show more</a>
    </movie-card>
`
}



function getMovieModalData(movie_id) {
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=8441a5264ec7146ab1efd03895169958&language=en-US&append_to_response=credits`)
        .then(response => {
            return response.json();
        })

}

export { getMovieItem }


customElements.define("movie-card",
    class MovieCard extends HTMLElement {
        constructor() {
            super();
            var link = document.querySelector('link#card');
            //  var post = link.import.querySelector('#blog-post');
            let template = link.import.getElementById("movie-card").content;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.cloneNode(true));
            //link card css file
            const linkElement = document.createElement("link");
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', 'assets/styles/card.css');
            shadowRoot.appendChild(linkElement);


            const showModalElement = shadowRoot.getElementById("movie-card-container");
            let quikView;
            showModalElement.addEventListener('click', event => {
                getMovieModalData(this.getAttribute("id"))
                    .then(response => {
                        console.log(response);
                        document.getElementsByTagName('movie-quick-view').length && document.body.removeChild(document.getElementsByTagName('movie-quick-view')[0]);
                        quikView = document.createElement('movie-quick-view');
                        quikView.innerHTML = `<span slot="movie-quick-title">${response.title}
            </span>
            <img slot="movie-modal-image" src="${getImagePath(response.poster_path)}" alt="movie-modal-image" width="240" height="170"/> 
            <span slot="movie-modal-description">${response.overview}</span>
            <span slot="movie-modal-genres">${response.genres.map(genre => genre.name)}</span>
            <span slot="movie-modal-cast" class="movie-modal__cast">${response.credits.cast.slice(0, 5).map(actor => actor.name)}</span>
            <span slot="movie-modal-director">${response.credits.crew.find(actor => actor.job === "Director").name}</span>
            <span slot="movie-modal-rating">${rating(response.vote_average)}</span>`;

                        document.body.appendChild(quikView);

                    });
                event.preventDefault();
            }

            )

        }
    }
)


