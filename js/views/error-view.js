import AbstractView from "./abstract-view";

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
      <div class="end">
        <p>${this.error}</p>
      </div>
    `;
  }
}