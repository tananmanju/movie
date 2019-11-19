import { addHeader, resolveImagePath, supportsImports, searchParamUrl } from "./common.js";
import API from './api.js';
import VARIABLES from './variables.js';
import './actor-detail.js';

if (supportsImports()) {
    addHeader();
    init();

} else {
    window.addEventListener('HTMLImportsLoaded', function (e) {
        addHeader();
        init();
    });
}

async function init() {
    const actorID = searchParamUrl();
    const actor = await API.call(VARIABLES.ACTOR + actorID);
    let actorDetail = document.createElement('actor-detail');
    actorDetail.innerHTML = `<img slot="actor-image" class="actor-image" src="${resolveImagePath(actor.profile_path)}" width="auto" height="400"/>
                <span slot="actor-name">${actor.name}</span>
                <span slot="actor-popularity"> ${Math.floor(actor.popularity)}</span>
                <span slot="actor-DOB">${actor.birthday}</span>
                <span slot="actor-biography">${actor.biography}</span>`;

    document.getElementById('actor').appendChild(actorDetail);

    const movies = await API.call(VARIABLES.ACTOR + actorID + '/movie_credits');


    const map = {};
    for (const cast of movies.cast) {
        let year = new Date(cast.release_date).getFullYear();
        //console.log(year);
        if (isNaN(year)) continue;
        if (!map[year]) map[year] = [];
        map[year].push(cast);
    }

    for (const key in map) {
        if (map.hasOwnProperty(key)) {
            const yearSection = document.createElement('actor-film-list-year');
            let filmography = '';
            for (const actorData of map[key]) {
                filmography += `<actor-film-detail>
                            <span slot="film-title">
                            ${actorData.title}
                            </span> <span slot="film-year">${key}</span>
                            <span slot="film-character">
                            ${actorData.character}
                            </slot></actor-film-detail>`;
            }

            yearSection.innerHTML = `<span slot="actor-film-year">${key}</span><div class="films" slot="films">${filmography}</div>`;
            document.getElementById("filmography").appendChild(yearSection);
        }

    }
}