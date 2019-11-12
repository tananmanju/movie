import { loadTemplate, getTemplate } from "./common.js";
loadTemplate("actor-detail", "/views/actor-detail.html");

customElements.define("actor-detail",
    class ActorDetail extends HTMLElement {
        constructor() {
            super();

            let shadowRoot = this.attachShadow({ mode: 'open' });

            const template = getTemplate("actor-detail");

            shadowRoot.appendChild(template.content.cloneNode(true));

        }
    }
)

customElements.define("actor-film-list-year",
    class ActorFilmList extends HTMLElement {
        constructor() {
            super();

            let shadowRoot = this.attachShadow({ mode: 'open' });

            const template = getTemplate("actor-detail","actor-film-list");

            shadowRoot.appendChild(template.content.cloneNode(true));

        }
    }
)
customElements.define("actor-film-detail",
    class ActorFilmDetail extends HTMLElement {
        constructor() {
            super();

            let shadowRoot = this.attachShadow({ mode: 'open' });

            const template = getTemplate("actor-detail","actor-film-detail");

            shadowRoot.appendChild(template.content.cloneNode(true));

        }
    }
)
