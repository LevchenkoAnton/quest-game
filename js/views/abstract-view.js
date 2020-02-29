import {createNode} from "../util";

export default class AbstractView {
  constructor() {
    if(new.target === AbstractView) {
      throw new Error(`Can't instance AbstractView, only correct one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return createNode(this.template);
  }

  bind() {}
}
