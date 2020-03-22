import AbstractView from "./abstract-view";
import Router from "../router";
import {KEY_CODES} from "../data/quest-utils";

export default class WelcomeView extends AbstractView {
  get template() {
    return `
      <div class="end">
        <p>Ghbdtn! Настало время приключений! Вы готовы сразится с неприятностями и получить принцессу прямо сейчас?!<br>
          A?!<br>
          Точно?!<br>
          Уверен?!<br>
          Стопудов?!</p>
        <p>08 есть?</p>
        <div class="repeat">
          Ваше имя:<input class="player-name" type="text"><br>
          <span class="repeat-action">Да</span>
      </div>
    `;
  }

  bind(element) {
    const agreeBtn = element.querySelector(`.repeat-action`);
    this._playerNameInput = element.querySelector(`.player-name`);

    agreeBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const playerName = this._playerNameInput.value.trim();
      if (!playerName) {
        return;
      }

      Router.showGame(playerName);
    });

    this._playerNameInput.addEventListener(`keydown`, ({target, keyCode}) => {
      const playerName = this._playerNameInput.value.trim();

      if (!playerName || keyCode !== KEY_CODES.ENTER) {
        return;
      }

      Router.showGame(playerName);
    });
  }

  onFocus() {
    this._playerNameInput.focus();
  }
}
