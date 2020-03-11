import {adaptServerData} from "./data-adapter";

const DATABASE_URL = `https://es.dump.academy/text-quest`;
const DEFAULT_NAME = 'o0';
const APP_ID = '19870714';
const checkStatus = (response) => {
    if (response.status >= 200 && response.status <= 300) {
        return response;
    }
    throw new Error(`${response.status} ${response.statusText}`);
};

export default class Loader {
    static loadData() {
        return fetch(`${DATABASE_URL}/quest`)
            .then(checkStatus)
            .then(response => response.json())
            .then(adaptServerData)
            .catch(err => {
                console.log(`loadData method error: ${err}`);
                throw new Error(err);
            });
    }

    static loadResults(name = DEFAULT_NAME) {
        return fetch(`${DATABASE_URL}/stats/${APP_ID}-${name}`)
            .then(checkStatus)
            .then(response => response.json())
            .catch(err => {
                console.log(`loadResults method error: ${err}`);
                throw new Error(err);
            });
    }

    static saveResults(data, name = DEFAULT_NAME) {
        data = Object.assign({name}, data);
        const requestSettings = {
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST'
        };
        return fetch(`${DATABASE_URL}/stats/${APP_ID}-${name}`, requestSettings)
            .then(checkStatus)
            .catch(err => {
                console.log(`saveResult method error: ${err}`);
                throw new Error(err);
            });
    }
}