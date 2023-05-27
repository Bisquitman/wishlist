import { API_URI, JWT_TOKEN_KEY } from './const.js';
import { createBurgerMenu } from './createBurgerMenu.js';
import { createElement } from './helpers.js';
import { auth, router } from './index.js';
import { renderModal } from './renderModal.js';

const nav = document.querySelector('.nav');
createBurgerMenu(nav, 'nav_active', '.nav__btn');

export const renderNavigation = () => {
  nav.textContent = '';

  const buttonSignUp = createElement('button', {
    className: 'nav__btn btn',
    textContent: 'Зарегистрироваться',
  });
  buttonSignUp.addEventListener('click', (e) => {
    renderModal({
      title: 'Регистрация',
      description: 'Введите ваши данные для регистрации на сервисе WishList',
      btnSubmit: 'Зарегистрироваться',
      submitHandler: async (event) => {
        const formData = new FormData(event.target);
        const credentials = {
          login: formData.get('login'),
          password: formData.get('password'),
        };

        try {
          const response = await fetch(`${API_URI}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem(JWT_TOKEN_KEY, data.token);
            auth.login = data.login;
            router.setRoute(`/user/${data.login}`);

            return true;
          } else {
            const { message = 'Неизвестная ошибка' } = await response.json();
            console.log(message);
            throw new Error(message);
          }
        } catch (error) {
          alert(error.message);
        }
      },
    });
  });

  const buttonLogin = createElement('button', {
    className: 'nav__btn btn',
    textContent: 'Войти',
  });
  buttonLogin.addEventListener('click', (e) => {
    renderModal({});
  });

  nav.append(buttonSignUp, buttonLogin);
};
