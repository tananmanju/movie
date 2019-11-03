customElements.define("movie-quick-view",
    class MovieQuickView extends HTMLElement {
        constructor() {
            super();
            let template = document.getElementById("movie-quick-view").content;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.cloneNode(true));
               //link card css file
               const linkElement = document.createElement("link");
               linkElement.setAttribute('rel', 'stylesheet');
               linkElement.setAttribute('href', 'styles/modal.css');
               shadowRoot.appendChild(linkElement)

            shadowRoot.getElementById('modal-close').addEventListener('click', removeModal);

            function removeModal() {
                document.getElementsByTagName('movie-quick-view').length && document.body.removeChild(document.getElementsByTagName('movie-quick-view')[0]);
            }
            window.addEventListener('click', removeModal);
        }

        disconnectedCallback() {
            window.removeEventListener('click', removeModal);
        }

    }
)