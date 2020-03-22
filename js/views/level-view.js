import AbstractView from "./abstract-view";
import {KEY_CODES} from "../data/quest-utils";

export default class LevelView extends AbstractView {
  constructor(level) {
    super();
    this._level = level;
  }

  get template() {
    return `
      <div class="quest">
        <p class="text">${this._level.text}</p>
        <input class="answer-input" type="text">
        <ul class="answers">
          ${this._level.answers
                    .map((answer) => `<li class="answer">${answer.action.toUpperCase()}. ${answer.title}</li>`).join(``)}
        </ul>
      </div>
    `;
  }

  bind(element) {
    this._answerInput = element.querySelector(`.answer-input`);
    const answersList = element.querySelector(`.answers`);
    const answers = Array.from(element.querySelectorAll(`.answer`));

    this._answerInput.addEventListener(`keydown`, ({keyCode}) => {
      if (keyCode !== KEY_CODES.ENTER) {
        return;
      }

      const answer = this._level.answers.find( ({action}) => action === this._answerInput.value.toLowerCase() );

      this.onAnswer(answer);
    });

    answersList.addEventListener(`click`, ({target}) => {
      const answerElement = target.closest(`.answer`);

      if ( !answerElement ) {
        return;
      }

      const answer = this._level.answers[answers.indexOf(answerElement)];

      this.onAnswer(answer);
    })
  }

  onAnswer() {}

  onFocus() {
    this._answerInput.focus();
  }
}
