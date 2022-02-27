import Block from '~src/utils/block';
import ValidInput from '~src/components/valid-input/valid-input';
import Submit from '~src/components/submit/submit';
import signinTemplate from './signin.template';
import { VALIDATION_INPUT } from '~src/utils';

export default class Signin extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    const emailInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.EMAIL,
      placeholder: 'Почта',
      name: 'email',
      type: 'text',
      className: 'signin__input',
    });
    const loginInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className: 'signin__input',
    });
    const firstNameInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.NAME,
      placeholder: 'Имя',
      name: 'first_name',
      type: 'text',
      className: 'signin__input',
    });
    const secondNameInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.NAME,
      placeholder: 'Фамилия',
      name: 'second_name',
      type: 'text',
      className: 'signin__input',
    });
    const phoneInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.PHONE,
      placeholder: 'Телефон',
      name: 'phone',
      type: 'text',
      className: 'signin__input',
    });
    const passwordInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.PASSWORD,
      placeholder: 'Пароль',
      name: 'password',
      type: 'password',
      className: 'signin__input',
    });
    const secondPasswordInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.REPEATED_PASSWORD,
      placeholder: 'Пароль (ещё раз)',
      name: 'password',
      type: 'password',
      className: 'signin__input',
    });

    const validatedInputList: ValidInput[] = [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
    ];

    const submitButton = new Submit({
      text: 'Зарегистрироваться',
      className: 'signin__button',
      events: {
        click: (event) => {
          event.preventDefault();
          validatedInputList.forEach((child) => {
            child.validate();
          });

          secondPasswordInput.validate(passwordInput.value);

          // eslint-disable-next-line no-console
          console.log('FORM_DATA', {
            email: emailInput.value,
            login: loginInput.value,
            firstName: firstNameInput.value,
            secondName: secondNameInput.value,
            phone: phoneInput.value,
            password: passwordInput.value,
          });
        },
      },
    });
    return {
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      secondPasswordInput,
      submitButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'signin',
    };
  }

  public render(): DocumentFragment {
    return this.compile(signinTemplate);
  }
}
