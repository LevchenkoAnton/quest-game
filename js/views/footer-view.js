import AbstractView from "./abstract-view";

export default class FooterView extends AbstractView {
  get template() {
    return `
      <div>
        <div class="result"></div>
        <small>Для справки введите <i>help</i></small>
      </div>
    `;
  }
}
