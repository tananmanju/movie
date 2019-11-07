import {getMovieItem} from "./card.js";

const ITEMS_TO_MOVE = 4;
const ITEM_WIDTH = 345  ;

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
