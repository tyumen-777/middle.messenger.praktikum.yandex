import { Block } from '../../utils/Block.ts';
import template from './login.hbs?raw';
import { Button, FieldBlock } from '../../components';
import { INPUT_NAMES } from '../../constants';
import { validateInput, validateInputs } from '../../utils/validator.ts';

export default class Login extends Block {
  public state = {};

  constructor(props: any) {
    super({
      ...props,
      LoginField: new FieldBlock({
        label: 'Логин',
        name: INPUT_NAMES.LOGIN,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.LOGIN });
            if (valid) {
              this.setState(INPUT_NAMES.LOGIN, inputValue);
              this.children.LoginField.setProps({ error: '' });
            } else {
              this.children.LoginField.setProps({ error: 'Введите корректный логин' });
            }
          },
        },
      }),
      PasswordField: new FieldBlock({
        label: 'Пароль',
        name: INPUT_NAMES.PASSWORD,
        type: 'password',
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.PASSWORD });
            if (valid) {
              this.setState(INPUT_NAMES.PASSWORD, inputValue);
              this.children.PasswordField.setProps({ error: '' });
            } else {
              this.children.PasswordField.setProps({ error: 'Введите корректный пароль' });
            }
          },
        },
      }),
      AuthButton: new Button({
        label: 'Авторизоваться',
        onClick: () => {
          const { isValid } = validateInputs(Object.keys(this.state) as Array<INPUT_NAMES>);
          console.log(this.state);
          console.log(isValid);
        },
      }),
      SignupButton: new Button({ label: 'Нет аккаунта?', variant: 'link', page: 'signup' }),
    });
  }

  protected render(): string {
    return template;
  }

  setState(key: string, value: unknown) {
    return (this.state = { ...this.state, [key]: value });
  }
}
