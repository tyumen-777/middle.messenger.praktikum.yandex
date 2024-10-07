import { Block } from '../../utils/Block.ts';
import template from './profile.hbs?raw';
import { Avatar, Button, ButtonIcon } from '../../components';
import { ArrowIcon } from '../../assets/icons';
import userAvatar from '../../assets/animal.webp';

export default class Profile extends Block {
  constructor(props: any) {
    super({
      ...props,
      UserAvatar: new Avatar({ size: 'large', link: userAvatar }),
      BackIcon: new ButtonIcon({ src: ArrowIcon, page: 'chats' }),
      ExitButton: new Button({ page: 'login', variant: 'link', label: 'Выйти' }),
    });
  }

  protected render(): string {
    return template;
  }
}
