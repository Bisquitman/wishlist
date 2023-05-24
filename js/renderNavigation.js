import { createElement } from './helpers.js';

const nav = document.querySelector('.nav');
// const burger = createBurgerMenu(nav);

export const renderNavigation = () => {
  nav.textContent = '';

  const buttonSignUp = createElement('button', {
    className: 'nav__btn btn',
    textContent: 'Зарегистрироваться',
  });
  buttonSignUp.addEventListener('click', (e) => {
    console.log('Зарегистрироваться');
  });

  const buttonLogin = createElement('button', {
    className: 'nav__btn btn',
    textContent: 'Войти',
  });
  buttonLogin.addEventListener('click', (e) => {
    console.log('Войти');
  });

  nav.append(buttonSignUp, buttonLogin);
};
