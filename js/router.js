import WelcomeView from "./views/welcome-view";
import {changeScreen} from "./util";
import GameScreen from "./game-screen";
import GameModel from "./model/game-model";
import ScoreboardView from "./views/scoreboard-view";
import ErrorView from "./views/error-view";
import LoaderView from "./views/loader-view";
import {adaptServerDate} from "./data/data-adapter";

const databaseUrl = `https://es.dump.academy/text-quest/quest`;
const checkStatus = (response) => {
  if (response.status >= 200 && response.status <= 300) {
    return response;
  }
  throw new Error(`${response.status} ${response.statusText}`);
};

let questData;

export default class Router {
  static start() {
    const loaderView = new LoaderView();
    changeScreen(loaderView.element);
    loaderView.start();

    fetch(databaseUrl)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => questData = data)
        .then(response => Router.showWelcome())
        .catch(Router.showError)
        .finally(() => loaderView.stop());
  }

  static showWelcome() {
    const welcome = new WelcomeView();
    changeScreen(welcome.element);
  }

  static showGame(playerName) {
    const game = new GameScreen( new GameModel(adaptServerDate(questData), playerName) );
    changeScreen(game.element);
    game.startGame();
  }

  static showScoreBoard(model) {
    const scoreboard = new ScoreboardView(model);
    scoreboard.onGameAgain = this.start;
    changeScreen(scoreboard.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeScreen(errorView.element);
  }
}
