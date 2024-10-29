import UserApi from '../api/UserApi.ts';
import {
  IUserApiRequest,
  IUserChangePassRequest,
  IUserSearchRequest,
} from '../api/types/UserApi.types.ts';
import store from '../store/Store.ts';

export default class UserController {
  private api = new UserApi();

  public changeUserInfo(data: IUserApiRequest) {
    return this.api.changeUserInfo(data).then((response) => store.set('user', response));
  }

  public changeUserPassword(data: IUserChangePassRequest) {
    return this.api.changeUserPassword(data);
  }

  public changeUserAvatar(data: File) {
    const formData = new FormData();
    formData.append('avatar', data);
    return this.api.changeUserAvatar(formData).then((response) => store.set('user', response));
  }

  public searchUser({ login }: IUserSearchRequest) {
    return this.api.searchUser({ login });
  }
}
