import HeaderView from "./views/header-view";
import FooterView from "./views/footer-view";
import LevelView from "./views/level-view";
import {RESULT} from "./data/quest-utils";
import {EndGameView} from "./views/end-game-view";
import Router from "./router";

export default class GameScreen {
  constructor(model) {
    this._model =  model;
    this._header = new HeaderView(this._model.state);
    this._content = new LevelView( this._model.getCurrentLevel() );
    this._footer = new FooterView();

    this._root = document.createElement(`div`);
    this._root.append(this._header.element);
    this._root.append(this._content.element);
    this._root.append(this._footer.element);
  }

  get element() {
    return this._root;
  }

  startGame() {
    this.changeLevel();
    this._tick();
  }

  stopGame() {
    clearTimeout(this._timer);
  }

  updateHeader() {
    const header = new HeaderView(this._model.state);
    this.element.replaceChild(header.element, this.element.firstChild);
  }

  changeLevel() {
    const level = new LevelView( this._model.getCurrentLevel() );
    level.onAnswer = this.answer.bind(this);

    this._changeContent(level);
  }

  answer(answer) {
    this.stopGame();

    switch (answer.result) {
      case RESULT.NEXT_LEVEL: {
        this._model.nextLevel();
        this.startGame();
        break;
      }
      case RESULT.DIE: {
        this._model.die();

        this.endGame();
        break;
      }
      case RESULT.WIN: {
        this._exit();
        break;
      }
      default: {
        throw new Error(`Unknown result ${answer.result}`);
      }
    }
  }

  endGame() {
    const dieContent = new EndGameView(this._model.isDie());
    dieContent.onRestart = this._restart.bind(this);
    dieContent.onExit = this._exit.bind(this);

    this.updateHeader();
    this._changeContent(dieContent);
  }

  _changeContent(view) {
    this._root.replaceChild(view.element, this._content.element);
    this._content = view;
  }

  _restart() {
    this.changeLevel();
  }

  _exit() {
    Router.showScoreBoard(this._model);
  }

  _tick() {
    this._model.tick();
    this.updateHeader();

    this._timer = setTimeout(() => this._tick(), 1000);
  }
}
