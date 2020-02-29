/*
import {createElement, changeView} from './util';
import renderHeader from './game/header';
import renderLevel from './game/game-level';
import {questData, game} from './data/quest-data';
import end from './end';

const footer = `<div class="result"></div>
<small>Для справки введите <i>help</i></small></ul>`;

let current = -1;
let element;

const getLevel = (num) => questData[`level-${num}`];

const changeLevel = (num) => {
  current = num;
  const level = getLevel(num);

  element = createElement(`
          ${renderHeader(game)}
          ${renderLevel(level)}
          ${footer}`);
  return element;
};

// Load first level on start!
element = changeLevel(0);

document.onkeydown = (evt) => {
  if (evt.keyCode === 13) {
    const next = current + 1;
    if (getLevel(next)) {
      changeView(changeLevel(next));
    } else {
      changeLevel(0);
      changeView(end);
    }
  }
};

export default element;
*/
