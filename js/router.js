import WelcomeView from "./views/welcome-view";
import {changeScreen} from "./util";
import GameScreen from "./game-screen";
import GameModel from "./model/game-model";
import ScoreboardView from "./views/scoreboard-view";

export default class Router {
  static showWelcome() {
    const welcome = new WelcomeView();
    changeScreen(welcome.element);
  }

  static showGame(playerName) {
    const game = new GameScreen( new GameModel(playerName) );
    changeScreen(game.element);
    game.startGame();
  }

  static showScoreBoard(model) {
    const scoreboard = new ScoreboardView(model);
    scoreboard.onGameAgain = this.showWelcome;
    changeScreen(scoreboard.element);
  }
}
