import Handlebars from 'handlebars';
import './styles/styles.scss';
import * as Pages from './pages';
import * as Components from './components';
import { ArrowIcon, EmptyAvatar } from './assets/icons';

const pages: Record<string, any[]> = {
  login: [Pages.LoginPage, {}],
  signup: [Pages.SignupPage, {}],
  chats: [Pages.ChatsPage],
  profile: [
    Pages.ProfilePage,
    {
      arrowIcon: ArrowIcon,
      size: 'large',
      emptyImage: EmptyAvatar,
    },
  ],
  'profile-edit': [
    Pages.ProfileEdit,
    {
      arrowIcon: ArrowIcon,
      size: 'large',
      emptyImage: EmptyAvatar,
    },
  ],
  '404': [Pages.ErrorPage, { error: '404', errorMessage: 'Не туда попали' }],
  '500': [Pages.ErrorPage, { error: '500', errorMessage: 'Мы уже фиксим' }],
};

Object.entries(Components).forEach(([name, component]) =>
  Handlebars.registerPartial(name, component),
);

const navigate = (page: keyof typeof pages) => {
  const container = document.querySelector('#app');
  const [source, context] = pages[page];

  if (container) {
    container.innerHTML = Handlebars.compile(source)(context);
  }
};

document.addEventListener('DOMContentLoaded', () => navigate('profile-edit'));

document.addEventListener('click', (event) => {
  const page = event.target as HTMLInputElement;
  const attr = page.getAttribute('page');
  if (attr) {
    navigate(attr);

    event.preventDefault();
    event.stopImmediatePropagation();
  }
});
