const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = "680d339ae650bec42897ef2b4401d0de";

export default {
    call: function (method, params) {
        const options = { api_key: API_KEY, ...params };
        var queryString = Object.keys(options).map(key => key + '=' + options[key]).join('&');
        const url = `${BASE_URL}/${method}?${queryString}`;
        return fetch(url).then(response => response.json())
    }
}