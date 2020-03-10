import {changeLevel, die, INITIAL_GAME, tickTime} from "../data/quest-utils";

export default class GameModel {
  constructor(questData, playerName) {
    this.playerName = playerName;
    this._questData = questData;
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
    return this._questData[`level-${this._state.level}`];
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
