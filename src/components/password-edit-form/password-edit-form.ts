import { Block } from '../../utils/Block.ts';
import template from './password-edit-form.hbs?raw';
import { FieldInlineBlock } from '../field-inline-block';
import { Button } from '../button';
import { INPUT_NAMES, ROUTES } from '../../constants';
import UserController from '../../controllers/UserController.ts';
import { IUserChangePassRequest } from '../../api/types/UserApi.types.ts';
import { validateInput, validateInputs } from '../../utils/validator.ts';

export default class PasswordEditForm extends Block {
  public state: IUserChangePassRequest = { newPassword: '', oldPassword: '' };

  userController = new UserController();

  constructor(props?: any) {
    super({
      ...props,
      OldPassword: new FieldInlineBlock({
        label: 'Старый пароль',
        name: INPUT_NAMES.OLD_PASSWORD,
        value: '',
        events: {
          onBlur: () => this.onBlur(INPUT_NAMES.OLD_PASSWORD, 'OldPassword'),
        },
      }),
      NewPassword: new FieldInlineBlock({
        label: 'Новый пароль',
        name: INPUT_NAMES.NEW_PASSWORD,
        value: '',
        events: {
          onBlur: () => this.onBlur(INPUT_NAMES.NEW_PASSWORD, 'NewPassword'),
        },
      }),
      RepeatPassword: new FieldInlineBlock({
        label: 'Повторите новый пароль',
        name: INPUT_NAMES.NEW_PASSWORD_AGAIN,
        value: '',
        events: {
          onBlur: (event: Event) => {
            const { value } = event.target as HTMLInputElement;
            console.log(this.state.newPassword);
            console.log(value === this.state.newPassword);
          },
        },
      }),
      SubmitButton: new Button({
        label: 'Сохранить',
        onClick: () => this.onSubmit(),
      }),
    });
  }

  protected render(): string {
    return template;
  }

  setState(key: string, value: unknown) {
    return (this.state = { ...this.state, [key]: value });
  }

  onBlur(elementId: INPUT_NAMES, inputName: string) {
    const { valid, inputValue } = validateInput({ elementId });
    if (valid) {
      this.setState(elementId, inputValue);
      this.children[inputName].setProps({ error: '' });
    } else {
      this.children[inputName].setProps({ error: 'Введите корректный пароль' });
    }
  }

  onSubmit() {
    const { isValid } = validateInputs(Object.keys(this.state) as Array<INPUT_NAMES>);
    if (!isValid) {
      return;
    }
    this.userController
      .changeUserPassword(this.state)
      .then(() => window.router.go(ROUTES.PROFILE_PAGE))
      .catch((error) => console.log(error));
  }
}
