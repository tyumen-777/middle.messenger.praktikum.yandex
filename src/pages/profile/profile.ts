import { Block } from '../../utils/Block.ts';
import template from './profile.hbs?raw';
import { Avatar, Button, ButtonIcon } from '../../components';
import { ArrowIcon } from '../../assets/icons';
import { ROUTES } from '../../constants';
import AuthController from '../../controllers/AuthController.ts';
import connect from '../../utils/connect.ts';
import { IStoreState } from '../../store/Store.ts';

class Profile extends Block {
  authController = new AuthController();

  constructor(props: any) {
    super({
      ...props,
      UserAvatar: new Avatar({ size: 'large', link: props.avatar }),
      BackIcon: new ButtonIcon({
        src: ArrowIcon,
        onClick: () => {
          window.router.go(ROUTES.CHATS);
        },
      }),
      ExitButton: new Button({
        page: 'login',
        variant: 'link',
        label: 'Выйти',
        onClick: () => {
          this.logOut();
        },
      }),
      EditProfileButton: new Button({
        label: 'Изменить данные',
        variant: 'link',
        onClick: () => window.router.go(ROUTES.PROFILE_PAGE_EDIT),
      }),
      EditPasswordButton: new Button({
        label: 'Изменить пароль',
        variant: 'link',
        onClick: () => window.router.go(ROUTES.CHANGE_PASSWORD),
      }),
    });
  }

  logOut() {
    this.authController
      .logOut()
      .then(() => {
        window.router.go(ROUTES.LOGIN);
      })
      .catch((error) => console.log(error));
  }

  // protected componentDidMount() {
  //   const authController = new AuthController();
  //   authController.getUser().catch((error) => console.log(error));
  // }

  protected render(): string {
    const authController = new AuthController();
    authController.getUser().catch((error) => console.log(error));

    return template;
  }
}

function mapUserToProps(store: IStoreState) {
  return { ...store.user };
}

export default connect(mapUserToProps)(Profile);
