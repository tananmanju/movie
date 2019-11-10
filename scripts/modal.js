customElements.define("movie-quick-view",
    class MovieQuickView extends HTMLElement {
        constructor() {
            super();
            // Bring in the import content.
            var link = document.querySelector('link#quick-view');
            console.log(link);

            let template = link.import.getElementById("movie-quick-view").content;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.cloneNode(true));

            //link card css file
            const linkElement = document.createElement("link");
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', 'styles/modal.css');
            shadowRoot.appendChild(linkElement);

            //close the modal
            shadowRoot.getElementById('modal-close').addEventListener('click', removeModal);

            function removeModal() {
                document.getElementsByTagName('movie-quick-view').length && document.body.removeChild(document.getElementsByTagName('movie-quick-view')[0]);
            }
            window.addEventListener('click', removeModal);
        }
       //called when the element is distroyed
        disconnectedCallback() {
            window.removeEventListener('click', removeModal);
        }

    }
)