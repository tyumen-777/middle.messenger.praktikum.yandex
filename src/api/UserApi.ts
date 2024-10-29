import HTTPTransport from '../utils/HttpTransport.ts';
import {
  IUserApiRequest,
  IUserApiResponse,
  IUserChangePassRequest,
  IUserSearchRequest,
} from './types/UserApi.types.ts';

export default class UserApi {
  private http = new HTTPTransport();

  public changeUserInfo(data: IUserApiRequest) {
    return this.http.put('/user/profile', { data });
  }

  public changeUserPassword(data: IUserChangePassRequest) {
    return this.http.put('/user/password', { data });
  }

  public changeUserAvatar(data: FormData) {
    return this.http.put('/user/profile/avatar', { data });
  }

  public searchUser(data: IUserSearchRequest): Promise<IUserApiResponse[]> {
    return this.http.post('/user/search', { data });
  }
}
