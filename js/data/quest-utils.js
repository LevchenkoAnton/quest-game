export const INITIAL_GAME = {
  level: 0,
  lives: 3,
  time: 0
};

export const RESULT = {
  DIE: 0,
  WIN: 1,
  NEXT_LEVEL: 2
};

export const KEY_CODES = {ENTER: 13};

export const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be only number`);
  }

  if (level < 0) {
    throw new Error(`Level should be only positive number`);
  }

  return Object.assign({}, state, {level});
};

export const die = (state) => {
  return Object.assign({}, state, {lives: state.lives - 1})
};

export const tickTime = (state) => {
  return Object.assign({}, state, {time: state.time + 1});
};
