import {loadTemplate, getTemplate, resolveImagePath} from "./common.js";
import API from '../scripts/api.js';
import VARIABLES from '../scripts/variables.js';

const templateId = 'card-template';
loadTemplate(templateId, 'views/card.html');

class MovieCard extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        const template = getTemplate(templateId);
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const showModalElement = this.shadowRoot.getElementById("movie-card-container");
        let quickView;
        showModalElement.addEventListener('click', event => {
            API.call(VARIABLES.MOVIE + this.getAttribute("id"), {append_to_response: 'credits'})
                .then(response => {
                    console.log(response);
                    document.getElementsByTagName('movie-quick-view').length && document.body.removeChild(document.getElementsByTagName('movie-quick-view')[0]);
                    quickView = document.createElement('movie-quick-view');
                    quickView.innerHTML = `<span slot="movie-quick-title">${response.title}</span>
                                        <img slot="movie-modal-image" src="${resolveImagePath(response.backdrop_path)}" alt="movie-modal-image" width="240" height="170"/>
                                        <span slot="movie-modal-description">${response.overview}</span>
                                        <span slot="movie-modal-genres">${response.genres.map(genre => genre.name)}</span>
                                        <span slot="movie-modal-cast" class="movie-modal__cast">${response.credits.cast.slice(0, 5).map(actor => actor.name)}</span>
                                        <span slot="movie-modal-director">${response.credits.crew.find(actor => actor.job === "Director").name}</span>
                                        <movie-rating slot="movie-modal-rating" rating="${response.vote_average}"></movie-rating>`

                    document.body.appendChild(quickView);

                });
            event.preventDefault();
        });

    }
}

customElements.define("movie-card", MovieCard);
