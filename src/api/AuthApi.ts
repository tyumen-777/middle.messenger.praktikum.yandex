import HTTPTransport from '../utils/HttpTransport.ts';
import { IAuthSignInRequest, IAuthSignUpRequest } from './types/AuthApi.types.ts';

export default class AuthApi {
  private http = new HTTPTransport();

  public signUp(data: IAuthSignUpRequest) {
    return this.http.post('/auth/signup', { data });
  }

  public signIn(data: IAuthSignInRequest) {
    return this.http.post('/auth/signin', { data });
  }

  public logOut() {
    return this.http.post('/auth/logout');
  }

  public getUser() {
    return this.http.get('/auth/user');
  }
}
