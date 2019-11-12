/*
import {getMovieItem} from "./card.js";

const ITEMS_TO_MOVE = 4;
const ITEM_WIDTH = 315;

function productScroll(id) {
    let slider = document.getElementById(id);
    let next = slider.getElementsByClassName("pro-next")[0];
    let prev = slider.getElementsByClassName("pro-prev")[0];
    let slide = slider.getElementsByClassName("slide")[0];
    let item = slider.getElementsByClassName("slide")[0];

    console.log(next);

    //refer elements by class name

    let position = 0; //slider postion

    prev.addEventListener("click", function () {
        //click previous button

        if (position > 0) {
            //avoid slide left beyond the first item
            position -= ITEMS_TO_MOVE;
            translateX(position, slide); //translate items
        }
    });
    next.addEventListener("click", function () {
        console.log("position", position)
        if (position >= 0 && position < hiddenItems()) {
            //avoid slide right beyond the last item
            position += ITEMS_TO_MOVE;
            translateX(position, slide); //translate items
        }
    });

    function hiddenItems() {
        //get hidden items
        let items = item.children.length;
        console.log("items",items);
        console.log("slider.offsetWidth",slider.offsetWidth);
        console.log(" ITEM_WIDTH", ITEM_WIDTH)
        let visibleItems = slider.offsetWidth / ITEM_WIDTH;
        console.log("visibleItems",visibleItems);
        return items - Math.ceil(visibleItems);
    }
}

function translateX(position, slide) {
    //translate items
    slide.style.left = position * -ITEM_WIDTH + "px";
}


function getCarousel(id, data) {
    let items = data.movies.map(movie => {
        movie.genres = movie.genre_ids.map(genre_id => {
            return data.genres[genre_id]
        });
        return getMovieItem(movie)
    });


    return `<h2>${data.title}</h2>
            <div class="slider-parent" id="${id}">
                <div class="slider">
                      <div class="slide" id="slide">${items.join("")}</div>
                </div>
                <button class="ctrl-btn pro-prev">
                    <i class="fa fa-chevron-left fa-3x"></i>
                </button>
                <button class="ctrl-btn pro-next">
                    <i class="fa fa-chevron-right fa-3x"></i>
                </button>
            </div>`
}

export {getCarousel, productScroll}
*/

let ITEMS_TO_MOVE = 4;
let ITEM_WIDTH = 332;
import {loadTemplate, getTemplate, resolveImagePath} from "./common.js";

const templateId = 'carousel-template';
loadTemplate(templateId, 'views/carousel.html');

class MovieCarousel extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        const template = getTemplate(templateId);
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const itemsTemplates = this.items.map(movie => {
            return `<movie-card id="${movie.id}">
                         <img slot="movie-image" src="${resolveImagePath(movie.poster_path)}"  alt="movie-image" class="card-image" title="movie-image" />
                         <span slot="movie-title">${movie.title}</span>
                         ${movie.popularity > 150 ? '<i slot="movie-popularity" class="fa fa-heart red card-heart"></i>' : '<i slot="movie-popularity" class="fa fa-heart card-heart"></i>'}
                         <span slot="movie-genres">${movie.genre_ids.map(id => this.genres[id])}</span>
                         <movie-rating rating="${movie.vote_average}" slot="movie-rating"></movie-rating>
                         <a slot="movie-show-more" href="/movie.html?id=${movie.id}" class="show-more">Show more</a>
                     </movie-card>`
        });

        this.innerHTML = `<span slot="title">${this.title}</span><div style="display: flex" slot="items">${itemsTemplates.join("")}</div>`;

        this.productScroll();
    }

    get title() {
        return this.getAttribute('title');
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    productScroll() {
        let slider = this.shadowRoot.getElementById('slider-parent');
        let next = slider.getElementsByClassName("pro-next")[0];
        let prev = slider.getElementsByClassName("pro-prev")[0];
        let slide = slider.getElementsByClassName("slide")[0];
        let item = slider.getElementsByClassName("slide")[0];

        let position = 0; //slider postion

        prev.addEventListener("click", () => {
            if (position > 0) {
                position -= ITEMS_TO_MOVE;
                this.translateX(position, slide); //translate items
            }
        });
        next.addEventListener("click", () => {
            if (position >= 0 && position < hiddenItems()) {
                position += ITEMS_TO_MOVE;
                this.translateX(position, slide); //translate items
            }
        });

        function hiddenItems() {
            const slotElement = item.getElementsByTagName("slot")[0].assignedElements().shift();
            let items = slotElement.children.length;
            let visibleItems = slider.offsetWidth / ITEM_WIDTH;
            return items - Math.ceil(visibleItems);
        }

        this.handleCarouselWidth();


        this.handleCarouselWidth = this.handleCarouselWidth.bind(this);
        window.addEventListener('resize', this.handleCarouselWidth);
    }

    handleCarouselWidth() {
        let sliderParent = this.shadowRoot.getElementById('slider-parent');
        const slider = sliderParent.getElementsByClassName("slider")[0];
        const sliderWidth = sliderParent.offsetWidth;
        const itemWidth = document.querySelector('movie-card').offsetWidth;
        const itemsCanBeShown = Math.floor(sliderWidth / itemWidth);
        slider.style.width = itemsCanBeShown * itemWidth + 'px';
        ITEMS_TO_MOVE = itemsCanBeShown;
    }

    translateX(position, slide) {
        slide.style.left = position * -ITEM_WIDTH + "px";
    }
}

customElements.define('movie-carousel', MovieCarousel);
