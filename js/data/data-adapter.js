import {RESULT} from "./quest-utils";

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

export const adaptServerDate = data => {
    for (const levelData of Object.values(data)) {
        levelData.answers = preprocessAnswer(levelData.answers);
    }

    return data;
};