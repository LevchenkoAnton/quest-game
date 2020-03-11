import WelcomeView from "./views/welcome-view";
import {changeScreen} from "./util";
import GameScreen from "./game-screen";
import GameModel from "./model/game-model";
import ScoreboardView from "./views/scoreboard-view";
import ErrorView from "./views/error-view";
import LoaderView from "./views/loader-view";
import Loader from "./data/loader";

let questData;

export default class Router {
  static start() {
    const loaderView = new LoaderView();
    changeScreen(loaderView.element);
    loaderView.start();

    Loader.loadData()
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
    const game = new GameScreen( new GameModel(questData, playerName) );
    changeScreen(game.element);
    game.startGame();
  }

  static showScoreBoard(model) {
    const playerName = model.playerName;
    const scoreboard = new ScoreboardView();

    scoreboard.onGameAgain = this.start;
    changeScreen(scoreboard.element);

    Loader.saveResults(model.state, playerName)
        .then(() => Loader.loadResults(playerName))
        .then(score => scoreboard.showScoreboard(score))
        .catch(Router.showError);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeScreen(errorView.element);
  }
}
