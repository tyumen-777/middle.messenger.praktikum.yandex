import { Block } from '../../utils/Block.ts';
import template from './signup.hbs?raw';
import { Button, FieldBlock } from '../../components';
import { validateInput, validateInputs } from '../../utils/validator.ts';
import { INPUT_NAMES, ROUTES } from '../../constants';
import AuthController from '../../controllers/AuthController.ts';
import { IAuthSignUpRequest } from '../../api/types/AuthApi.types.ts';

export default class Signup extends Block {
  public state: IAuthSignUpRequest = {
    email: '',
    first_name: '',
    login: '',
    password: '',
    phone: '',
    second_name: '',
  };

  authController = new AuthController();

  constructor(props: any) {
    super({
      ...props,
      EmailField: new FieldBlock({
        label: 'Почта',
        name: INPUT_NAMES.EMAIL,
        type: 'email',
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.EMAIL });
            if (valid) {
              this.setState(INPUT_NAMES.EMAIL, inputValue);
              this.children.EmailField.setProps({ error: '' });
            } else {
              this.children.EmailField.setProps({ error: 'Введите корректный email' });
            }
          },
        },
      }),
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
      FirstNameField: new FieldBlock({
        label: 'Имя',
        name: INPUT_NAMES.FIRST_NAME,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.FIRST_NAME });
            if (valid) {
              this.setState(INPUT_NAMES.FIRST_NAME, inputValue);
              this.children.FirstNameField.setProps({ error: '' });
            } else {
              this.children.FirstNameField.setProps({ error: 'Введите корректное имя' });
            }
          },
        },
      }),
      SecondNameField: new FieldBlock({
        label: 'Фамилия',
        name: INPUT_NAMES.SECOND_NAME,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.SECOND_NAME });
            if (valid) {
              this.setState(INPUT_NAMES.SECOND_NAME, inputValue);
              this.children.SecondNameField.setProps({ error: '' });
            } else {
              this.children.SecondNameField.setProps({ error: 'Введите корректную фамилию' });
            }
          },
        },
      }),
      PhoneField: new FieldBlock({
        label: 'Телефон',
        name: INPUT_NAMES.PHONE,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.PHONE });
            if (valid) {
              this.setState(INPUT_NAMES.PHONE, inputValue);
              this.children.PhoneField.setProps({ error: '' });
            } else {
              this.children.PhoneField.setProps({ error: 'Введите корректный телефон' });
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
      RepeatPasswordField: new FieldBlock({
        label: 'Пароль (ещё раз)',
        name: INPUT_NAMES.PASSWORD_AGAIN,
        type: 'password',
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.PASSWORD_AGAIN });
            if (valid) {
              this.setState(INPUT_NAMES.PASSWORD_AGAIN, inputValue);
              this.children.RepeatPasswordField.setProps({ error: '' });
            } else {
              this.children.RepeatPasswordField.setProps({
                error: 'Введите корректный пароль еще раз',
              });
            }
          },
        },
      }),
      RegisterButton: new Button({
        label: 'Зарегистрироваться',
        type: 'submit',
        onClick: () => {
          const { isValid } = validateInputs(Object.keys(this.state) as Array<INPUT_NAMES>);
          if (isValid) {
            this.signUp();
          }
        },
      }),
      LoginButton: new Button({
        label: 'Войти',
        variant: 'link',
        page: 'login',
        onClick: () => window.router.go(ROUTES.LOGIN),
      }),
    });
  }

  signUp() {
    this.authController
      .signUp(this.state)
      .then(() => window.router.go(ROUTES.LOGIN))
      .catch((error) => console.log(error));
  }

  setState(key: string, value: unknown) {
    return (this.state = { ...this.state, [key]: value });
  }

  protected render(): string {
    return template;
  }
}
