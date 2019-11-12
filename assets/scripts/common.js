
export function resolveGenres(data) {
    return data.genres.reduce(function (acc, item) {
        acc[item.id] = item.name;
        return acc;
    }, {});
}

export function resolveImagePath(path) {
    return `https://image.tmdb.org/t/p/w500/${path}`
}

export function addHeader() {
    const link = document.querySelector('link#header').import;
    const header = link.querySelector("header");
    document.querySelector("#header-section").appendChild(header);
}

export function getTemplate(id) {
    const link = document.querySelector(`link#${id}`).import;
    return link.querySelector(`#${id}`);
}

export function attachCarousel(target, dataSet, {id, title, genres}) {
    const carousel = document.createElement('movie-carousel');
    carousel.items = dataSet;
    carousel.genres = genres;
    carousel.setAttribute('title', title);
    document.getElementById(target).appendChild(carousel);
}

export function loadTemplate(id, url) {
    const link = document.createElement('link');
    link.rel = 'import';
    link.id = id;
    link.href = url;
    document.head.appendChild(link);
}

export function supportsImports() {
    const supports = 'import' in document.createElement('link');
    if (!supports) {
        const polyfill = document.createElement('script');
        polyfill.src = "assets/scripts/HTMLImports.min.js";
        document.body.appendChild(polyfill);
    }
    return supports;
}
