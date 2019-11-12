const template = document.createElement('template');

template.innerHTML = `<link rel="stylesheet" href="/assets/css/font-awesome.min.css"/><slot name="rating"></slot>`;


customElements.define('movie-rating',
    class MovieRating extends HTMLElement {

        constructor() {
            super();
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.appendChild(template.content.cloneNode(true))
        }

        connectedCallback() {
            const rating = this.getAttribute('rating');
            const newRating = Math.round(rating * 0.5);

            let stars = '';
            for (let i = 0; i < newRating; i++) {
                stars += '<span class="fa red fa-star"></span>'
            }
            for (let i = 0; i < 5 - newRating; i++) {
                stars += '<span class="fa fa-star"></span>'
            }
            this.innerHTML = `<span slot="rating">${stars}</span>`
        }

    });
