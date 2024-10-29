import { Block } from '../../utils/Block.ts';
import template from './profile-form.hbs?raw';
import { FieldInlineBlock } from '../field-inline-block';
import { INPUT_NAMES, ROUTES } from '../../constants';
import { validateInput } from '../../utils/validator.ts';
import { Button } from '../button';
import { IStoreState } from '../../store/Store.ts';
import connect from '../../utils/connect.ts';
import UserController from '../../controllers/UserController.ts';
import { IUserApiRequest } from '../../api/types/UserApi.types.ts';

class ProfileForm extends Block {
  public state: IUserApiRequest = {
    display_name: '',
    email: '',
    first_name: '',
    login: '',
    phone: '',
    second_name: '',
  };

  userController = new UserController();

  constructor(props: any) {
    super({
      ...props,
      EmailLine: new FieldInlineBlock({
        label: 'Почта',
        name: INPUT_NAMES.EMAIL,
        value: props.user.email,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.EMAIL });
            if (valid) {
              this.setState(INPUT_NAMES.EMAIL, inputValue);
              this.children.EmailLine.setProps({ error: '' });
            } else {
              this.children.EmailLine.setProps({ error: 'Введите корректный email' });
            }
          },
        },
      }),
      LoginLine: new FieldInlineBlock({
        label: 'Логин',
        name: INPUT_NAMES.LOGIN,
        value: props.user.login,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.LOGIN });
            if (valid) {
              this.setState(INPUT_NAMES.LOGIN, inputValue);
              this.children.LoginLine.setProps({ error: '' });
            } else {
              this.children.LoginLine.setProps({ error: 'Введите корректный логин' });
            }
          },
        },
      }),
      FirstNameLine: new FieldInlineBlock({
        label: 'Имя',
        name: INPUT_NAMES.FIRST_NAME,
        value: props.user.first_name,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.FIRST_NAME });
            if (valid) {
              this.setState(INPUT_NAMES.FIRST_NAME, inputValue);
              this.children.FirstNameLine.setProps({ error: '' });
            } else {
              this.children.FirstNameLine.setProps({ error: 'Введите корректное имя' });
            }
          },
        },
      }),
      SecondNameLine: new FieldInlineBlock({
        label: 'Фамилия',
        name: INPUT_NAMES.SECOND_NAME,
        value: props.user.second_name,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.SECOND_NAME });
            if (valid) {
              this.setState(INPUT_NAMES.SECOND_NAME, inputValue);
              this.children.SecondNameLine.setProps({ error: '' });
            } else {
              this.children.SecondNameLine.setProps({ error: 'Введите корректную фамилию' });
            }
          },
        },
      }),
      NicknameLine: new FieldInlineBlock({
        label: 'Имя в чате',
        name: INPUT_NAMES.DISPLAY_NAME,
        value: props.user.display_name,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.DISPLAY_NAME });
            if (valid) {
              this.setState(INPUT_NAMES.DISPLAY_NAME, inputValue);
              this.children.NicknameLine.setProps({ error: '' });
            } else {
              this.children.NicknameLine.setProps({ error: 'Введите корректное имя' });
            }
          },
        },
      }),
      PhoneLine: new FieldInlineBlock({
        label: 'Телефон',
        name: INPUT_NAMES.PHONE,
        value: props.user.phone,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.PHONE });
            if (valid) {
              this.setState(INPUT_NAMES.PHONE, inputValue);
              this.children.PhoneLine.setProps({ error: '' });
            } else {
              this.children.PhoneLine.setProps({ error: 'Введите корректный телефон' });
            }
          },
        },
      }),
      SubmitButton: new Button({
        page: 'profile',
        label: 'Сохранить',
        onClick: () => {
          console.log(this.state);
          this.changeProfile();
        },
      }),
    });
  }

  protected render(): string {
    return template;
  }

  setState(key: string, value: unknown) {
    return (this.state = { ...this.state, [key]: value });
  }

  protected componentDidMount() {
    Object.entries(this.props).map(([key, value]) => {
      this.setState(key, value);
    });
  }

  changeProfile() {
    this.userController
      .changeUserInfo(this.state)
      .then(() => window.router.go(ROUTES.PROFILE_PAGE))
      .catch((error) => console.log(error));
  }
}

function mapUserToProps(store: IStoreState) {
  return { user: store.user };
}

export default connect(mapUserToProps)(ProfileForm);
