
import { loadTemplate, getTemplate } from "./common.js";
loadTemplate("movie-detail", "/views/movie-detail.html")
customElements.define("movie-detail",
    class MovieDetail extends HTMLElement {
        constructor() {
            super();

            let shadowRoot = this.attachShadow({ mode: 'open' });

            const template = getTemplate("movie-detail");

            shadowRoot.appendChild(template.content.cloneNode(true));

        }
        connectedCallback() {
            const favMovies = JSON.parse(localStorage.getItem('favMovies') || '[]');
console.log(favMovies)
            if (favMovies.includes(this.movie.id)) {
                this.shadowRoot.querySelector(".fa-heart").classList.add('red');
            }


            const favButton = this.shadowRoot.querySelector(".movie-banner__favorite");
            favButton.addEventListener('click', () => {
                const currentIndex = favMovies.indexOf(this.movie.id);
                if (currentIndex > -1) {
                    favMovies.splice(currentIndex, 1);
                    this.shadowRoot.querySelector(".fa-heart").classList.remove('red');
                }
                else {
                    favMovies.push(this.movie.id);
                    this.shadowRoot.querySelector(".fa-heart").classList.add('red');
                }
                localStorage.setItem('favMovies',JSON.stringify(favMovies));
            });
        }
    }
)