const urlActor = new URLSearchParams(window.location.search);
const actorID = urlActor.get('id');
console.log(actorID);
const API_KEY = "8441a5264ec7146ab1efd03895169958";
const actorImage_Base = "https://image.tmdb.org/t/p/w500/";

function getActorData() {
    return fetch(`https://api.themoviedb.org/3/person/${actorID}?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            return response.json();
        })
}
function getActorFilmData() {
    return fetch(`https://api.themoviedb.org/3/person/${actorID}/movie_credits?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            return response.json();
        })
}

getActorData().then(actor => {
    console.log(actor);
    let actorDetail = document.getElementsByTagName('actor-detail')[0];
    actorDetail.innerHTML = `<img slot="actor-image" src="${actorImage_Base + actor.profile_path}" width="auto" height="400"/>
    <span slot="actor-name">${actor.name}</span>
    <span slot="actor-DOB">${actor.birthday}</span>
    <span slot="actor-biography">${actor.biography}</span>`;
})
getActorFilmData().then(film => {
    console.log("filmcast", film.cast);
    const map = {};
    for (const cast of film.cast) {
        console.log("year", cast.release_date);
        let year = new Date(cast.release_date).getFullYear();
        if (isNaN(year)) continue;
        if (!map[year]) map[year] = [];
        map[year].push(cast);
    }
    console.log(map);

   
    for (const key in map) {

        const yearSection = document.createElement('actor-film-list-year');
        let filmography = '';
        for (const actorData of map[key]) {
            filmography += `<actor-film-detail>    
            <span slot="film-title">
            ${actorData.title}
            </span> <span slot="film-year">${key}</span>
            <span slot="film-character">
            ${actorData.character}
            </slot></actor-film-detail>` ;
        }

        yearSection.innerHTML = `<span slot="actor-film-year">
        ${key}
        </span><div class="films" slot="films">${filmography}</div>`;

        console.log("yearSection",yearSection);

        document.getElementById("filmography").appendChild(yearSection);
    }

});
customElements.define('actor-film-list-year',
    class actorFilmList extends HTMLElement {
        constructor() {
            super();
            let template = document.getElementById("actor-film-list").content;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.cloneNode(true));
             

        }
    })


customElements.define('actor-detail',
    class ActorDetail extends HTMLElement {
        constructor() {
            super();
            let template = document.getElementById("actor-detail").content;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.cloneNode(true));

            //link movie css file
            const linkElement = document.createElement("link");
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', 'styles/actor.css');
            shadowRoot.appendChild(linkElement);

        }
    }
)
customElements.define('actor-film-detail',
    class ActorFilmDetail extends HTMLElement {
        constructor() {
            super();
            let template = document.getElementById("actor-film-detail").content;
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.cloneNode(true));
        }
    }
)


