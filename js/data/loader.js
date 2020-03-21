import {adaptServerData, adaptServerScores} from "./data-adapter";
import {DEFAULT_NAME} from "./quest-utils";

const checkStatus = (response) => {
    if (response.status >= 200 && response.status <= 300) {
        return response;
    }
    throw new Error(`${response.status} ${response.statusText}`);
};

const database = Symbol(`firebase.database.config`);

export default class Loader {
    static get [database]() {
        return {
            apiKey: `AIzaSyCoYfQTV9zm1cSfPXkKfpNMl6IIJKFb0oY`,
            authDomain: `mario-quest-game-c31c4.firebaseapp.com`,
            databaseURL: `https://mario-quest-game-c31c4.firebaseio.com`,
            projectId: `mario-quest-game-c31c4`,
            storageBucket: `mario-quest-game-c31c4.appspot.com`,
            messagingSenderId: `882110188042`,
            appId: `1:882110188042:web:eddb66c6528ae8a05eadf3`,
            questDataDBName: `quest-data`,
            resultsDBName: `users-results`
        }
    };

    static async loadData() {
        try {
            const gameDataResponse = await fetch(`${Loader[database].databaseURL}/${Loader[database].questDataDBName}.json`);
            checkStatus(gameDataResponse);

            const gameData = await gameDataResponse.json();
            return adaptServerData(gameData);
        } catch (e) {
            console.log(`loadData method error: ${e}`);
            throw new Error(e);
        }
    }

    static async loadResults(name = DEFAULT_NAME) {
        try {
            const resultsResponse = await fetch(`${Loader[database].databaseURL}/${Loader[database].resultsDBName}.json`);
            checkStatus(resultsResponse);

            const results = await resultsResponse.json();
            return adaptServerScores(results);
        } catch (e) {
            console.log(`loadResults method error: ${e}`);
            throw new Error(e);
        }
    }

    static async saveResults(data, name = DEFAULT_NAME) {
        const requestSettings = {
            body: JSON.stringify({...data, name, date: new Date()}),
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST'
        };

        try {
            const saveResultsResponse = await fetch(`${Loader[database].databaseURL}/${Loader[database].resultsDBName}.json`, requestSettings);
            checkStatus(saveResultsResponse);
        } catch (e) {
            console.log(`saveResult method error: ${e}`);
            throw new Error(e);
        }
    }
}