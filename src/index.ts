import Chats from '~src/pages/chats/chats';
import ProfileEditing from '~src/pages/profile-editing/profile-editing';
import render from './utils/render-dom';
import Login from '~src/pages/login/login';
import Notfound from '~src/pages/notfound/notfound';
import Profile from '~src/pages/profile/profile';
import Unavailable from '~src/pages/unavailable/unavailable';
import Signin from '~src/pages/signin/signin';

const chatsPage = new Chats();
const loginPage = new Login();
const signinPage = new Signin();
const notFoundPage = new Notfound();
const profilePage = new Profile();
const profileEditingPage = new ProfileEditing();
const unavailablePage = new Unavailable();

switch (document.location.pathname) {
  case '/':
  case '/login':
    render('#root', loginPage);
    break;
  case '/signin':
    render('#root', signinPage);
    break;
  case '/chats':
    render('#root', chatsPage);
    break;
  case '/profile':
    render('#root', profilePage);
    break;
  case '/profile-editing':
    render('#root', profileEditingPage);
    break;
  case '/unavailable':
    render('#root', unavailablePage);
    break;
  default:
    render('#root', notFoundPage);
}
