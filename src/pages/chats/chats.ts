import Chatlist from '~src/pages/chats/components/ChatList/chatlist';
import ChatWindow from '~src/pages/chats/components/ChatWindow/chatWindow';
import Block from '~src/utils/block';
import chatsTemplate from './chats.template';

export default class Chats extends Block {
  constructor() {
    super('div');

    this.setState({ activeId: null });
  }

  protected getChildren(): Record<string, Block> {
    const chatList = new Chatlist({
      onChatClick: (id: number) => this.setState({ activeId: id }),
    });
    const chatWindow = new ChatWindow();

    return {
      chatList,
      chatWindow,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chats__container',
    };
  }

  public render(): DocumentFragment {
    return this.compile(chatsTemplate, { activeId: this.state.activeId });
  }
}
