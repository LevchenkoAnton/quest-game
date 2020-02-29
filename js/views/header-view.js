import AbstractView from "./abstract-view";

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    return `
      <header class="header">
        <div>Мир: ${this._state.level}</div>
        <div>Жизни:
                ${new Array(3 - this._state.lives)
                          .fill(`<span class="heart__empty">♡</span>`).join(``)}
                ${new Array(this._state.lives)
                          .fill(`<span class="heart__full">♥</span>`).join(``)}
        </div>
        <div>Время: ${this._state.time}</div>
      </header>
    `
  }
}
