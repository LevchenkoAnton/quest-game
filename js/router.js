import WelcomeView from "./views/welcome-view";
import {changeView, compareObjByField} from "./util";
import GameScreen from "./game-screen";
import GameModel from "./model/game-model";
import ScoreboardView from "./views/scoreboard-view";
import ErrorView from "./views/error-view";
import LoaderView from "./views/loader-view";
import Loader from "./data/loader";
import {MAX_SCORES_TO_SHOW} from "./data/quest-utils";
import {sortScores} from "./data/data-adapter";

let questData;

export default class Router {
  static start() {
    Router.load();
  }

  static async load() {
    const loaderView = new LoaderView();
    changeView(loaderView.element);
    loaderView.start();

    try {
      questData = await Loader.loadData();
      Router.showWelcome();
    } finally {
      loaderView.stop();
    }
  }

  static showWelcome() {
    const welcome = new WelcomeView();
    changeView(welcome.element);
    welcome.onFocus();
  }

  static showGame(playerName) {
    const game = new GameScreen( new GameModel(questData, playerName) );
    changeView(game.element);
    game.startGame();
  }

  static async showScoreBoard(model) {
    const playerName = model.playerName;
    const scoreboard = new ScoreboardView();

    scoreboard.onGameAgain = this.start;
    changeView(scoreboard.element);

    try {
      await Loader.saveResults(model.state, playerName);
      const score = await Loader.loadResults(playerName);

      scoreboard.showScoreboard( sortScores(score).slice(0, MAX_SCORES_TO_SHOW) );
    } catch (e) {
      Router.showError(e);
    }
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeView(errorView.element);
  }
}
