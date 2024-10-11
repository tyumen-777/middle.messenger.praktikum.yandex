import { Block } from '../../utils/Block.ts';
import template from './chats.hbs?raw';
import { Avatar, Button, ButtonIcon, Message, MessageField, SearchField } from '../../components';
import { ChatMenuIcon, AttachIcon, ArrowIcon } from '../../assets/icons';
import { mockMessages } from '../../constants/mockMessages.ts';
import avatarPhoto from '../../assets/animal.webp';
import { validateInput } from '../../utils/validator.ts';
import { INPUT_NAMES } from '../../constants';

export default class Chats extends Block {
  public state = {};

  constructor(props: any) {
    super({
      ...props,
      ProfileButton: new Button({ page: 'profile', label: 'Профиль >', variant: 'secondary' }),
      SearchField: new SearchField(),
      UserAvatar: new Avatar({ size: 'small', link: avatarPhoto }),
      ProfileAvatar: new Avatar({ size: 'small', link: avatarPhoto }),
      MenuButton: new ButtonIcon({ type: 'secondary', src: ChatMenuIcon }),
      Messages: mockMessages[0].messages.map(
        (message) => new Message({ type: message.type, time: message.time, text: message.text }),
      ),
      AttachButton: new ButtonIcon({ type: 'secondary', src: AttachIcon }),
      MessageField: new MessageField({
        value: undefined,
        events: {
          onBlur: () => {
            const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.MESSAGE });
            if (valid) {
              this.setState(INPUT_NAMES.MESSAGE, inputValue);
              this.children.SubmitIcon.setProps({ disabled: false });
            } else {
              this.children.SubmitIcon.setProps({ disabled: true });
            }
          },
        },
      }),
      SubmitIcon: new ButtonIcon({ rotate: 180, src: ArrowIcon, disabled: true }),
    });
  }

  protected render(): string {
    return template;
  }

  setState(key: string, value: unknown) {
    return (this.state = { ...this.state, [key]: value });
  }
}
