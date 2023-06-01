import { JWT_TOKEN_KEY } from './const.js';
import { createHero } from './createHero.js';
import { createWishlist } from './createWishlist.js';
import { getLogin } from './serviceAPI.js';
import { renderNavigation } from './renderNavigation.js';
import { createEditProfile } from './createEditProfile.js';
import { createEditWish } from './createEditWish.js';

let isMainPage = true;

export const router = Router();
const token = localStorage.getItem(JWT_TOKEN_KEY);
export const auth = token ? await getLogin(token) : {};
if (!auth.login) {
  localStorage.removeItem(JWT_TOKEN_KEY);
}
const app = document.getElementById('app');

const handleEditPageRoute = async (id) => {
  isMainPage = false;
  app.textContent = '';

  const { sectionEditWish, formWish } = await createEditWish(id);
  renderNavigation('wish', formWish);
  app.append(sectionEditWish);
};

const handleEditProfileRoute = async (login) => {
  isMainPage = false;

  app.textContent = '';
  const { sectionEditProfile, formProfile } = await createEditProfile(login);
  renderNavigation('profile', formProfile);
  app.append(sectionEditProfile);
};

const handleUserRoute = async (login) => {
  isMainPage = false;

  app.textContent = '';
  renderNavigation();
  app.append(await createWishlist(login));
};

const handleHomePage = () => {
  isMainPage = false;

  app.textContent = '';
  renderNavigation();
  app.append(createHero());
};

const init = () => {
  router.on('/', handleHomePage);
  router.on('/editwish/:id', handleEditPageRoute);
  router.on('/editprofile/:login', handleEditProfileRoute);
  router.on('/user/:login', handleUserRoute);

  router.init();

  if (isMainPage) {
    if (auth.login) {
      router.setRoute(`/user/${auth.login}`);
    } else {
      router.setRoute('/');
    }
  }
};

init();
