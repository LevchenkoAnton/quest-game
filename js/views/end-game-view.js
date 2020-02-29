import AbstractView from "./abstract-view";

export class EndGameView extends AbstractView {
  constructor(isDie) {
    super();
    this._isDie = isDie;
  }

  get template() {
    return `
      <div class="end">
        <p>Вы погибли =(!</p>
        <p>Продолжить с последнего уровня?</p>
        <div class="repeat">
            ${this._isDie ? `` : `<span class="repeat-action repeat-agree">Да</span>|`}<span class="repeat-action repeat-disagree">Не</span>
        </div>
      </div>
    `;
  }

  bind(element) {
    const repeatHolder = element.querySelector(`.repeat`);

    repeatHolder.addEventListener(`click`, ({target}) => {
      if (target.classList.contains(`repeat-agree`) && !this._isDie) {
        this.onRestart();
      } else if (target.classList.contains(`repeat-disagree`)) {
        this.onExit();
      }
    });
  }

  onRestart() {}
  onExit() {}
}
