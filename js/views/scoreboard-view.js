import AbstractView from "./abstract-view";

export default class ScoreboardView extends AbstractView {
  constructor(model) {
    super();
    this._model = model;
  }

  get template() {
    return `
      <div class="end">
      <div class="scoreboard">
        <h1>Мои лучшие результаты</h1>

        <table class="scores">
          <tbody>
          <tr>
            <td>
              <small>1.</small>
            </td>
            <td style="text-align: right;">${this._model.state.time} сек:</td>
            <td>${this._model.playerName}, ${Array.from(this._model.state.lives).map(it => `❤`).join(``)}</td>
            <td>${new Date().toLocaleDateString()}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div class="repeat">
        <span class="repeat-action game-again">Сыграть заново</span>
      </div>
    </div>
    `;
  }

  bind(element) {
    const gameAgainBtn = element.querySelector(`.game-again`);

    gameAgainBtn.addEventListener(`click`, () => {
      this.onGameAgain();
    });
  }

  onGameAgain() {}
}
