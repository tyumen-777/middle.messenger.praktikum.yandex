import { Block } from '../../utils/Block.ts';
import template from './profile-edit.hbs?raw';
import { Avatar, ButtonIcon, ProfileForm } from '../../components';
import { ArrowIcon } from '../../assets/icons';
import userAvatar from '../../assets/animal.webp';

export default class ProfileEdit extends Block {
  constructor(props: any) {
    super({
      ...props,
      BackIcon: new ButtonIcon({ src: ArrowIcon, page: 'chats' }),
      UserAvatar: new Avatar({ size: 'large', link: userAvatar }),
      ProfileForm: new ProfileForm(),
    });
  }

  protected render(): string {
    return template;
  }
}
