import VARIABLES from './variables.js';

const defaultOptions = {
    api_key: VARIABLES.API_KEY,
    language: 'en-US'
};

export default {
    call: (method, params) => {
        const options = Object.assign({}, defaultOptions, params);
        // const options = {...defaultOptions, ...params};
        const queryString = Object.keys(options).map(key => key + '=' + options[key]).join('&');

        const url = `${VARIABLES.BASE_URL}/${method}?${queryString}`;
        console.log(url);
        return fetch(url).then(response => response.json());
    }
}
