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
    static async loadData() {
        try {
            const gameDataResponse = await fetch(`${DATABASE_URL}/quest`);
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
            const resultsResponse = await fetch(`${DATABASE_URL}/stats/${APP_ID}-${name}`);
            checkStatus(resultsResponse);
            return await resultsResponse.json();
        } catch (e) {
            console.log(`loadResults method error: ${e}`);
            throw new Error(e);
        }
    }

    static async saveResults(data, name = DEFAULT_NAME) {
        const requestSettings = {
            body: JSON.stringify({...data, name}),
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST'
        };

        try {
            const saveResultsResponse = await fetch(`${DATABASE_URL}/stats/${APP_ID}-${name}`, requestSettings);
            checkStatus(saveResultsResponse);
        } catch (e) {
            console.log(`saveResult method error: ${e}`);
            throw new Error(e);
        }
    }
}