import { API_URI } from './const.js';
import { createElement, pluralizeYears } from './helpers.js';
import { auth, router } from './index.js';
import { getUser } from './serviceAPI.js';

export const createWishlist = async (pageLogin) => {
  const login = auth.login;

  if (!pageLogin) {
    pageLogin = login;
  }

  const user = await getUser(pageLogin);
  console.log('user: ', user);

  const section = createElement('section', {
    className: 'wishlist',
  });

  const container = createElement('div', {
    className: 'container',
  });

  section.append(container);

  const profile = createElement('div', {
    className: 'wishlist__profile profile',
  });

  const fullname =
    user.name || user.surname
      ? `${user.name || ''} ${user.surname || ''}`.trim()
      : user.login;

  const avatar = createElement('img', {
    className: 'profile__avatar',
    src: `${API_URI}/${user.avatar}`,
    alt: `фото ${fullname}`,
  });

  const content = createElement('div', {
    className: 'profile__content',
  });

  const title = createElement('h2', {
    className: 'profile__fullname',
    textContent: fullname,
  });

  content.append(title);

  if (user.birthdate) {
    const birthday = new Date(user.birthdate); // полная дата рождения, получаем из базы
    // const day = birthday.getDate(); // число из др
    // const month = birthday.toLocaleString('default', { month: 'long' }); // месяц из др
    const dayAndMonth = birthday.toLocaleString('default', {
      month: 'long',
      day: 'numeric',
    });
    const dayAndMonthNow = Date.now().toLocaleString('default', {
      month: 'long',
      day: 'numeric',
    });
    const ageDiffMs = Date.now() - birthday.getTime(); // текущее время в мс - дата рождения в мс (от 01.01.1970 00:00:00)
    const ageDate = new Date(ageDiffMs); // возраст от 1970 года
    const age = Math.abs(ageDate.getUTCFullYear() - 1970); // возраст на текущий момент с учётом текущей даты (был др в этом году или ещё нет)
    const plural = pluralizeYears(dayAndMonthNow < dayAndMonth ? age : age + 1);

    // const ageMessage = `${day} ${month} исполнится ${age} ${plural}`;
    const ageMessage = `${dayAndMonth} исполнится ${
      dayAndMonthNow < dayAndMonth ? age : age + 1
    } ${plural}`;

    const birthdayElem = createElement('p', {
      className: 'profile__birthday',
      innerHTML: ageMessage,
    });

    content.append(birthdayElem);
  }

  if (login === pageLogin) {
    const editBtn = createElement('button', {
      className: 'profile__edit',
      innerHTML: `
        <svg width="38" height="38" viewBox="0 0 38 38" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.75 33.25H10.6875L28.1992 15.7384L22.2617 9.80086L4.75 27.3125V33.25ZM7.91667 28.6267L22.2617 14.2817L23.7183 15.7384L9.37333 30.0834H7.91667V28.6267ZM29.0858 5.20919C28.9394 5.06241 28.7654 4.94596 28.5738 4.86651C28.3823 4.78705 28.177 4.74615 27.9696 4.74615C27.7622 4.74615 27.5569 4.78705 27.3653 4.86651C27.1738 4.94596 26.9998 5.06241 26.8533 5.20919L23.9558 8.10669L29.8933 14.0442L32.7908 11.1467C32.9376 11.0002 33.0541 10.8262 33.1335 10.6347C33.213 10.4431 33.2539 10.2378 33.2539 10.0304C33.2539 9.82307 33.213 9.61774 33.1335 9.4262C33.0541 9.23466 32.9376 9.06067 32.7908 8.91419L29.0858 5.20919Z" />
        </svg>
        <span>редактировать профиль</span>
      `,
    });
    editBtn.addEventListener('click', (e) => {
      router.setRoute(`/editprofile/${login}`);
    });

    content.append(editBtn);
  }

  profile.append(avatar, content);
  container.append(profile);

  if (user.description) {
    const description = createElement('p', {
      className: 'wishlist__description',
      textContent: user.description,
    });
    container.append(description);
  }

  if (!Object.keys(user.wish).length) {
    const moWish = createElement('p', {
      className: 'wishlist__no-wish',
      textContent: 'Список желаний пуст',
    });
    container.append(moWish);
  } else {
    const categoriesList = createElement('ul', {
      className: 'wishlist__categories categories',
    });
    container.append(categoriesList);

    for (const title in user.wish) {
      if (!Object.hasOwnProperty.call(user.wish, title)) return;

      const categoriesItem = createElement('li', {
        className: 'categories__item',
      });

      const categoriesTitle = createElement('h3', {
        className: 'categories__title',
        textContent: title,
      });

      const wishlist = createElement('ul', {
        className: 'wishlist__items',
      });

      categoriesItem.append(categoriesTitle, wishlist);

      for (const item of user.wish[title]) {
        const itemElem = createElement('li', {
          className: 'wishlist__item item',
        });

        const itemImage = createElement('img', {
          className: 'item__image',
          src: `${API_URI}/${item.image}`,
          alt: item.title,
        });

        const itemTitle = createElement('h4', {
          className: 'item__title',
        });

        if (item.link) {
          const itemLink = createElement('a', {
            className: 'item__link',
            href: item.link,
            textContent: item.title,
            target: '_blank',
          });
          itemTitle.append(itemLink);
        } else {
          itemTitle.textContent = item.title;
        }

        const itemPrice = createElement('div', {
          className: 'item__price',
          innerHTML: item.price && `${item.price}&nbsp;${item.currency}`,
        });

        itemElem.append(itemImage, itemTitle, itemPrice);

        if (login === pageLogin) {
          const itemBtn = createElement('button', {
            className: 'item__btn btn btn_castling',
            textContent: 'Выбрать',
          });

          itemElem.append(itemBtn);

          itemBtn.addEventListener('click', (e) => {
            router.setRoute(`/editwish/${item.id}`);
          });
        }
        wishlist.append(itemElem);
      }
      categoriesList.append(categoriesItem);
    }
  }
  return section;
};
