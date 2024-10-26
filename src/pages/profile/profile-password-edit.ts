import { Block } from '../../utils/Block.ts';
import template from './profile-password-edit.hbs?raw';
import { Avatar, ButtonIcon, PasswordEditForm } from '../../components';
import { ArrowIcon } from '../../assets/icons';
import { ROUTES } from '../../constants';
import { IStoreState } from '../../store/Store.ts';
import connect from '../../utils/connect.ts';

class ProfilePasswordEdit extends Block {
  constructor(props: any) {
    super({
      ...props,
      BackIcon: new ButtonIcon({
        src: ArrowIcon,
        onClick: () => {
          window.router.go(ROUTES.PROFILE_PAGE);
        },
      }),
      PasswordEditForm: new PasswordEditForm(),
      UserAvatar: new Avatar({ link: '', size: 'large' }),
    });
  }

  protected render(): string {
    return template;
  }
}

function mapUserToProps(store: IStoreState) {
  return { user: store.user };
}

export default connect(mapUserToProps)(ProfilePasswordEdit);
