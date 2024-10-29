import AuthApi from '../api/AuthApi.ts';
import { IAuthSignInRequest, IAuthSignUpRequest } from '../api/types/AuthApi.types.ts';
import store from '../store/Store.ts';

export default class AuthController {
  private api = new AuthApi();

  signUp(formValues: IAuthSignUpRequest) {
    return this.api.signUp(formValues);
  }

  signIn(formValues: IAuthSignInRequest) {
    return this.api
      .signIn(formValues)
      .then(() => localStorage.setItem('isLogged', 'true'))
      .catch((err) => {
        if (err.reason === 'User already in system') {
          localStorage.setItem('isLogged', 'true');
        }
      });
  }

  logOut() {
    return this.api
      .logOut()
      .then(() => localStorage.removeItem('isLogged'))
      .then(() => store.resetState());
  }

  getUser() {
    return this.api.getUser().then((data) => {
      store.set('user', data);
    });
  }
}
