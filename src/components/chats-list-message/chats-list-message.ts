import { Block } from '../../utils/Block.ts';
import template from './chats-list-message.hbs?raw';
import store, { IChatState } from '../../store/Store.ts';
import { Avatar } from '../avatar';
import { websocket } from '../../utils/Websocket.ts';

export default class ChatsListMessage extends Block {
  constructor(props: IChatState, isActive: boolean = false) {
    super({
      ...props,
      events: { click: () => this.setActive() },
      UserAvatar: new Avatar({
        link: props.avatar,
        size: 'small',
        title: props.title.split('')[0],
      }),
      active: isActive,
      message: props.last_message?.content || '',
    });
  }

  setActive() {
    store.set('currentChatId', this.props.id);
    websocket.connect();
  }

  protected render(): string {
    return template;
  }
}
