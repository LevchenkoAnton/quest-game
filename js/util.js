export const createNode = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer;
};

const main = document.querySelector(`#main`);

export const changeScreen = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};
