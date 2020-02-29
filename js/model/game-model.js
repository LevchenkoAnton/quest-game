import {changeLevel, die, INITIAL_GAME, tickTime} from "../data/quest-utils";
import {QUEST_DATA} from "../data/quest-data";

const getLevel = (level) => QUEST_DATA[`level-` + level];

export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  restart() {
    this._state = INITIAL_GAME;
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  getCurrentLevel() {
    return getLevel(this._state.level);
  }

  die() {
    return this._state = die(this._state);
  }

  isDie() {
    return this._state.lives <= 0;
  }

  tick() {
    this._state = tickTime(this._state);
  }
}
