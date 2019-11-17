import { loadTemplate, getTemplate } from "./common.js";
loadTemplate("movie-quick-view", "/views/modal.html")

customElements.define("movie-quick-view",
    class MovieQuickView extends HTMLElement {
        constructor() {
            super();
            // Bring in the import content.
            // var link = document.querySelector('link#quick-view');
            // console.log(link);

            // let template = link.import.getElementById("movie-quick-view").content;
            // let shadowRoot = this.attachShadow({ mode: 'open' });
            // shadowRoot.appendChild(template.cloneNode(true));
            let shadowRoot = this.attachShadow({ mode: 'open' });

            const template = getTemplate("movie-quick-view");

            shadowRoot.appendChild(template.content.cloneNode(true));
            //link card css file
            // const linkElement = document.createElement("link");
            // linkElement.setAttribute('rel', 'stylesheet');
            // linkElement.setAttribute('href', 'assets/styles/modal.css');
            // shadowRoot.appendChild(linkElement);

            //close the modal
            shadowRoot.getElementById('modal-close').addEventListener('click', this.removeModal);

            
            window.addEventListener('click', this.removeModal);
            
        }
         removeModal() {
            document.getElementsByTagName('movie-quick-view').length && document.body.removeChild(document.getElementsByTagName('movie-quick-view')[0]);
        }
       //called when the element is distroyed
        disconnectedCallback() {
            window.removeEventListener('click', this.removeModal);
        }

    }
)