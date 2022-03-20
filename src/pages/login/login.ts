import Block from '~src/utils/block';
import Input from '~src/components/input/input';
import loginTemplate from './login.template';

export default class Login extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const loginField = new Input({
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className: 'login__input',
      events: {},
    });

    const passwordField = new Input({
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
      className: 'login__input',
      events: {},
    });

    return {
      loginField,
      passwordField,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'login',
    };
  }

  public render(): DocumentFragment {
    return this.compile(loginTemplate);
  }
}
