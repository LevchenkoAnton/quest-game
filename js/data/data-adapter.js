import {RESULT} from "./quest-utils";
import {compareArrayByObjectField} from "../util";

const ServerTwoResultMapper = {
    'die': RESULT.DIE,
    'win': RESULT.WIN,
    'next': RESULT.NEXT_LEVEL
};

const preprocessAnswer = answer => answer.map(answer => {
    const [action, title] = answer.action.split('.');
    return {
        action: action.toLowerCase(),
        title: title.trim(),
        result: ServerTwoResultMapper[answer.result]
    }
});

export const adaptServerData = data => {
    for (const levelData of Object.values(data)) {
        levelData.answers = preprocessAnswer(levelData.answers);
    }

    return data;
};


export const sortScores = score => {
    return score.sort(compareArrayByObjectField({
        lives: 1,
        time: -1,
        name: -1
    }));
};

export const adaptServerScores = score => {
    return Object.keys(score).map(key => ({...score[key]}));
};