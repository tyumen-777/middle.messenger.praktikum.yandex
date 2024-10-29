import { Block } from '../../utils/Block.ts';
import template from './profile-edit.hbs?raw';
import { Avatar, ButtonIcon, ModalChangeAvatar, ProfileForm } from '../../components';
import { ArrowIcon } from '../../assets/icons';
import { MODAL_NAMES, ROUTES } from '../../constants';
import { IStoreState } from '../../store/Store.ts';
import connect from '../../utils/connect.ts';
import { toggleModal } from '../../helpers/toggleModal.ts';

class ProfileEdit extends Block {
  constructor(props: any) {
    super({
      ...props,
      BackIcon: new ButtonIcon({
        src: ArrowIcon,
        page: 'chats',
        onClick: () => window.router.go(ROUTES.CHATS),
      }),
      UserAvatar: new Avatar({
        size: 'large',
        link: props.avatar,
        onClick: () => toggleModal.openModal(MODAL_NAMES.AVATAR_CHANGE_MODAL, 'modal__closed'),
      }),
      ProfileForm: new ProfileForm({ ...props }),
      AvatarModal: new ModalChangeAvatar({ onClick: () => console.log(123) }),
    });
  }

  protected render(): string {
    return template;
  }

  onAvatarClick() {
    const avatarModal = document.getElementById('avatar_change_modal');

    avatarModal?.classList.remove('modal__closed');
  }
}

function mapUserToProps(store: IStoreState) {
  return { ...store.user };
}

export default connect(mapUserToProps)(ProfileEdit);
