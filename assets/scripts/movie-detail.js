
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
    }
)