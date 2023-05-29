import { API_URI } from './const.js';
import {
  createElement,
  createSelectDate,
  handleImageFileSelection,
} from './helpers.js';
import { getUser } from './serviceAPI.js';

export const createEditProfile = async (login) => {
  const user = await getUser(login);

  const sectionEditProfile = createElement('section', {
    className: 'edit edit_profile',
  });

  const container = createElement('div', {
    className: 'container',
  });

  sectionEditProfile.append(container);

  const formProfile = createElement('form', {
    className: 'edit__form',
  });

  formProfile.addEventListener('submit', (e) => {
    // !todo
  });

  const editAvatar = createElement('fieldset', {
    className: 'edit__avatar',
  });

  const editAvatarImage = createElement('img', {
    className: 'edit__avatar-image',
    src: `${API_URI}/${user.avatar}`,
    alt: `Аватар ${user.login}`,
    title: user.login,
  });

  const editAvatarLoad = createElement('div', {
    className: 'edit__avatar-load',
  });

  const editAvatarLabel = createElement('label', {
    className: 'edit__label-avatar',
    htmlFor: 'avatar-load',
    innerHTML: `
      <svg width="38" height="38" viewBox="0 0 38 38" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.75 33.25H10.6875L28.1992 15.7384L22.2617 9.80086L4.75 27.3125V33.25ZM7.91667 28.6267L22.2617 14.2817L23.7183 15.7384L9.37333 30.0834H7.91667V28.6267ZM29.0858 5.20919C28.9394 5.06241 28.7654 4.94596 28.5738 4.86651C28.3823 4.78705 28.177 4.74615 27.9696 4.74615C27.7622 4.74615 27.5569 4.78705 27.3653 4.86651C27.1738 4.94596 26.9998 5.06241 26.8533 5.20919L23.9558 8.10669L29.8933 14.0442L32.7908 11.1467C32.9376 11.0002 33.0541 10.8262 33.1335 10.6347C33.213 10.4431 33.2539 10.2378 33.2539 10.0304C33.2539 9.82307 33.213 9.61774 33.1335 9.4262C33.0541 9.23466 32.9376 9.06067 32.7908 8.91419L29.0858 5.20919Z" />
      </svg>
      <span>Обновить фотографию</span>
    `,
  });

  const editAvatarInput = createElement('input', {
    className: 'edit__input-file edit__input-file_avatar',
    type: 'file',
    id: 'avatar-load',
    accept: 'image/jpeg, image/png',
  });

  const editHiddenInput = createElement('input', {
    type: 'hidden',
    name: 'avatar'
  });

  handleImageFileSelection(editAvatarInput, editAvatarImage, editHiddenInput);

  const btnDeleteAvatar = createElement('button', {
    className: 'edit__avatar-delete',
    type: 'button',
    innerHTML: `
      <svg width="38" height="38" viewBox="0 0 38 38" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.48842 29.6389C9.48842 31.35 10.9027 32.75 12.6313 32.75H25.2027C26.9313 32.75 28.3456 31.35 28.3456 29.6389V10.9722H9.48842V29.6389ZM12.6313 14.0833H25.2027V29.6389H12.6313V14.0833ZM24.417 6.30556L22.8456 4.75H14.9884L13.417 6.30556H7.91699V9.41667H29.917V6.30556H24.417Z" />
      </svg>
      <span>Удалить</span>
    `,
  });
  btnDeleteAvatar.addEventListener('click', (e) => {
    editAvatarInput.value = '';
    editAvatarImage.src = `./img/avatar.png`;
  });

  editAvatarLoad.append(editAvatarLabel, editAvatarInput, btnDeleteAvatar);
  editAvatar.append(editAvatarImage, editAvatarLoad);

  const editName = createElement('fieldset', {
    className: 'edit__name',
  });

  const editNameLable = createElement('label', {
    className: 'edit__label',
    innerHTML: `<span class="edit__label-text">Имя:</span>`,
  });

  const editNameInput = createElement('input', {
    className: 'edit__input',
    type: 'text',
    name: 'name',
    value: user.name || '',
  });

  editNameLable.append(editNameInput);

  const editSurnameLable = createElement('label', {
    className: 'edit__label',
    innerHTML: `<span class="edit__label-text">Фамилия:</span>`,
  });

  const editSurnameInput = createElement('input', {
    className: 'edit__input',
    type: 'text',
    name: 'surname',
    value: user.surname || '',
  });

  editSurnameLable.append(editSurnameInput);

  editName.append(editNameLable, editSurnameLable);

  const editBirthdate = createElement('fieldset', {
    className: 'edit__birthdate',
  });

  const editBirthdateLable = createElement('legend', {
    className: 'edit__label-text',
    textContent: 'Дата рождения:',
  });

  const editBirthdateWrapper = createElement('div', {
    className: 'edit__birthdate-wrapper',
  });

  editBirthdate.append(editBirthdateLable, editBirthdateWrapper);

  const editBirthdateLabelDay = createElement('label', {
    className: 'edit__label edit__label_select',
  });
  const editBirthdateSelectDay = createElement('select', {
    className: 'edit__select',
    name: 'day',
  });

  editBirthdateLabelDay.append(editBirthdateSelectDay);

  const editBirthdateLabelMonth = createElement('label', {
    className: 'edit__label edit__label_select',
  });
  const editBirthdateSelectMonth = createElement('select', {
    className: 'edit__select',
    name: 'month',
  });

  editBirthdateLabelMonth.append(editBirthdateSelectMonth);

  const editBirthdateLabelYear = createElement('label', {
    className: 'edit__label edit__label_select',
  });
  const editBirthdateSelectYear = createElement('select', {
    className: 'edit__select',
    name: 'year',
  });

  editBirthdateLabelYear.append(editBirthdateSelectYear);

  createSelectDate(
    editBirthdateSelectDay,
    editBirthdateSelectMonth,
    editBirthdateSelectYear,
    user.birthdate,
  );

  editBirthdateWrapper.append(
    editBirthdateLabelDay,
    editBirthdateLabelMonth,
    editBirthdateLabelYear,
  );

  const editDescription = createElement('fieldset', {
    className: 'edit__description',
  });

  const editDescriptionLabel = createElement('label', {
    className: 'edit__label-text',
    htmlFor: 'description',
    textContent: 'Вступительный текст:',
  });

  const editDescriptionTextarea = createElement('textarea', {
    className: 'edit__description-input',
    name: 'description',
    id: 'description',
  });

  editDescription.append(editDescriptionLabel, editDescriptionTextarea);

  const editSubmitBtn = createElement('button', {
    className: 'edit__submit-btn btn',
    textContent: 'Сохранить изменения',
    type: 'submit',
  });

  formProfile.append(
    editAvatar,
    editName,
    editBirthdate,
    editDescription,
    editSubmitBtn,
  );

  container.append(formProfile);

  return { sectionEditProfile, formProfile };
};
