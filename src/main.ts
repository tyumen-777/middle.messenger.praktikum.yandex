import Handlebars from 'handlebars';
import './styles/styles.scss';
import * as Pages from './pages';
// import * as Components from './components';
import { Divider, Form } from './components';
import Router from './utils/Router.ts';
import { ROUTES } from './constants';

// const pages: Record<string, any[]> = {
//   login: [Pages.LoginPage, {}],
//   signup: [Pages.SignupPage, {}],
//   chats: [Pages.ChatsPage, {}],
//   profile: [
//     Pages.ProfilePage,
//     {
//       arrowIcon: ArrowIcon,
//       size: 'large',
//       emptyImage: EmptyAvatar,
//     },
//   ],
//   'profile-edit': [
//     Pages.ProfileEdit,
//     {
//       arrowIcon: ArrowIcon,
//       size: 'large',
//       emptyImage: EmptyAvatar,
//     },
//   ],
//   '404': [Pages.ErrorPage, { error: '404', errorMessage: 'Не туда попали' }],
//   '500': [Pages.ErrorPage, { error: '500', errorMessage: 'Мы уже фиксим' }],
// };

// Object.entries(Components).forEach(([name, component]) =>
//   Handlebars.registerPartial(name, component),
// );
Handlebars.registerPartial('Divider', Divider);
Handlebars.registerPartial('Form', Form);

const router = new Router('app');
window.router = router;

router
  .use(ROUTES.LOGIN, Pages.LoginPage)
  .use(ROUTES.PROFILE_PAGE, Pages.ProfilePage)
  .use(ROUTES.PROFILE_PAGE_EDIT, Pages.ProfileEdit)
  .use(ROUTES.SIGN_UP, Pages.SignupPage)
  .use(ROUTES.CHATS, Pages.ChatsPage)
  .use(ROUTES.ERROR_PAGE, Pages.ErrorPage)
  .use(ROUTES.CHANGE_PASSWORD, Pages.ProfilePasswordEdit);

router.start();

// const navigate = (page: keyof typeof pages) => {
//   const container = document.getElementById('app')!;
//   const [Source, context] = pages[page];
//
//   if (typeof Source === 'function') {
//     const pageInstance = new Source(context);
//     container.innerHTML = '';
//     container.append(pageInstance.getContent());
//     return;
//   }
//
//   container.innerHTML = Handlebars.compile(Source)(context);
// };
//
// document.addEventListener('DOMContentLoaded', () => navigate('login'));
//
// document.addEventListener('click', (event) => {
//   const page = event.target as HTMLInputElement;
//   const attr = page.getAttribute('page');
//   if (attr) {
//     navigate(attr);
//
//     event.preventDefault();
//     event.stopImmediatePropagation();
//   }
// });
