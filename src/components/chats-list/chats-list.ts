import { Block } from '../../utils/Block.ts';
import template from './chats-list.hbs?raw';
import { ChatsListMessage } from '../chats-list-message';
import connect from '../../utils/connect.ts';
import { IStoreState } from '../../store/Store.ts';

class ChatList extends Block {
  constructor(props: any) {
    super({ ...props, ChatsDialogs: props.chats.map((item: any) => new ChatsListMessage(item)) });
  }

  protected render(): string {
    return template;
  }
}

function mapStateToProps(store: IStoreState) {
  return { chats: store.chats || [] };
}

export default connect(mapStateToProps)(ChatList);
