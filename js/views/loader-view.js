import AbstractView from "./abstract-view";
import {KEY_CODES} from "../data/quest-utils";

export default class LoaderView extends AbstractView {
  constructor(animationTime = 100) {
    super();
    this._current = 0;
    this._frames = `\\|/-`;
    this._animationInterval = null;
    this._animationTime = animationTime;
  }

  get template() {
    return `
      <div class="loader"></div>
    `;
  }

  _update() {
    this._current++;
    if (this._frames.length <= this._current) {
      this._current = 0;
    }

    this.element.querySelector('.loader').textContent = this._frames[this._current];
  }

  start() {
    this._animationInterval = setInterval(() => {
      this._update();
    }, this._animationTime);
  }

  stop() {
    this.element.remove();
    clearInterval(this._animationInterval);
  }
}
