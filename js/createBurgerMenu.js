import { createElement } from './helpers.js';

export const createBurgerMenu = (nav, classActiveMenu, selectorClose) => {
  const burger = createElement('button', {
    className: 'header__burger burger',
    innerHTML: '<span class="burger__line"></span>',
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger_active');
    nav.classList.toggle(classActiveMenu);
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest(selectorClose)) {
      burger.classList.remove('burger_active');
      nav.classList.remove(classActiveMenu);
    }
  });

  nav.before(burger);
};
