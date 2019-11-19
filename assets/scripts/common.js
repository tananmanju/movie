//Match Genres Id with Name
export function resolveGenres(data) {
    //console.log(data);
    return data.genres.reduce(function (acc, item) {
        acc[item.id] = item.name;
        //console.log(acc);
        return acc;
    }, {});
}
//Image Path
export function resolveImagePath(path, size = 'w500') {
    return `https://image.tmdb.org/t/p/${size}/${path}`
}
//Add header 
export function addHeader() {
    const link = document.querySelector('link#header').import;
    const header = link.querySelector("header");
    document.querySelector("#header-section").appendChild(header);
}
//Include Custom compenent Template 
export function getTemplate(id, templateId = id) {
    const link = document.querySelector(`link#${id}`);
    const content = link.import;
    return content.querySelector(`#${templateId}`);
}
//Add Carousel Data
export function attachCarousel(target, dataSet, { id, title, genres }) {
    const carousel = document.createElement('movie-carousel');
    carousel.items = dataSet;
    carousel.genres = genres;
    carousel.setAttribute('title', title);
    document.getElementById(target).appendChild(carousel);
}
//Include Template 
export function loadTemplate(id, url) {
    const link = document.createElement('link');
    link.rel = 'import';
    link.id = id;
    link.href = url;
    document.head.appendChild(link);
}

//Search Params from The URL
export function searchParamUrl(){
    const urlParams = new URLSearchParams(window.location.search);
    const paramId = urlParams.get('id');
    return paramId;
}
//Add support for Cross Browser
export function supportsImports() {
    const supports = 'import' in document.createElement('link');
    if (!supports) {
        const polyfill = document.createElement('script');
        polyfill.src = "assets/scripts/HTMLImports.min.js";
        document.body.appendChild(polyfill);
    }
    return supports;
}
