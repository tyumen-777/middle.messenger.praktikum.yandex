import Submit from '~src/components/submit/submit';
import ValidInput from '~src/components/valid-input/valid-input';
import Block from '~src/utils/block';
import profileEditingTemplate from './profile-editing.template';
import { VALIDATION_INPUT } from '~src/utils';

export default class ProfileEditing extends Block {
  constructor() {
    super('div');
  }

  protected getChildren(): Record<string, Block> {
    const emailInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.EMAIL,
      placeholder: 'Почта',
      name: 'email',
      type: 'text',
      className: 'profile-editing__input',
    });
    const loginInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.LOGIN,
      placeholder: 'Логин',
      name: 'login',
      type: 'text',
      className: 'profile-editing__input',
    });
    const firstNameInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.NAME,
      placeholder: 'Имя',
      name: 'first_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const secondNameInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.NAME,
      placeholder: 'Фамилия',
      name: 'second_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const chatNameInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.NAME,
      placeholder: 'Имя',
      name: 'chat_name',
      type: 'text',
      className: 'profile-editing__input',
    });
    const phoneInput = new ValidInput({
      isValid: false,
      validationName: VALIDATION_INPUT.PHONE,
      placeholder: 'Телефон',
      name: 'phone',
      type: 'text',
      className: 'profile-editing__input',
    });

    const validatedInputList: ValidInput[] = [
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      chatNameInput,
      phoneInput,
    ];

    const submitButton = new Submit({
      className: 'profile-editing__button',
      text: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          validatedInputList.forEach((input) => {
            input.validate();
          });

          // eslint-disable-next-line no-console
          console.log('PROFILE_FORM DATA', {
            email: emailInput.value,
            login: loginInput.value,
            firstName: firstNameInput.value,
            secondName: secondNameInput.value,
            chatName: chatNameInput.value,
            phone: phoneInput.value,
          });
        },
      },
    });

    return {
      emailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      chatNameInput,
      phoneInput,
      submitButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'profile-container',
    };
  }

  public render(): DocumentFragment {
    return this.compile(profileEditingTemplate);
  }
}
