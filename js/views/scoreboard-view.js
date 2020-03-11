import AbstractView from "./abstract-view";

export default class ScoreboardView extends AbstractView {
  get template() {
    return `
      <div class="end">
      <div class="scoreboard">
           Loading scoreboard ...
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

    this._scoreBoard = this.element.querySelector('.scoreboard');
  }

  showScoreboard(scores) {
    this._scoreBoard.innerHTML = `
      <h1>Мои лучшие результаты</h1>

      <table class="scores">
        <tbody>
        ${scores.map((it, i) => `
          <tr>
            <td>
              <small>${i + 1}.</small>
            </td>
            <td style="text-align: right;">${it.time} сек:</td>
            <td>${it.name}, ${Array.from(it.lives).map(() => `❤`).join(``)}</td>
            <td>${new Date(it.date).toLocaleDateString()}</td>
          </tr>
        `)}
        </tbody>
      </table>
    `;
  }

  onGameAgain() {}
}
