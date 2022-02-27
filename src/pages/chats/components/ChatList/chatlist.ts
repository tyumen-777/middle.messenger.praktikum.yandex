import * as pug from 'pug';
import ChatCard from '~src/pages/chats/components/ChatCard/chatCard';
import Block from '~src/utils/block';
import chatlistTemplate from './chatlist.template';

const chatsApi = [
  {
    name: 'Artemii',
    message: 'Hello',
    id: 1,
  },
  {
    name: 'Alexander',
    message: 'Hello',
    id: 2,
  },
  {
    name: 'Andrei',
    message: 'Hello',
    id: 3,
  },
  {
    name: 'Olga',
    message: 'Hello',
    id: 4,
  },
  {
    name: 'Nicky',
    message: 'Hello',
    id: 5,
  },
];

export type ChatlistProps = {
  onChatClick: (id: number) => void;
};

export default class Chatlist extends Block<ChatlistProps> {
  constructor(props: ChatlistProps) {
    super('div', props);
  }

  protected getChildren(): Record<string, Block> {
    return this.getChatList();
  }

  public getChatList() {
    const namedChatList = chatsApi.map((chatItem) => ([
      `chat${chatItem.id}`,
      new ChatCard({
        name: chatItem.name,
        message: chatItem.message,
        events: {
          click: () => {
            this.props.onChatClick(chatItem.id);
          },
        },
      }),
    ]));

    return Object.fromEntries(namedChatList);
  }

  public compile(template: string, props?: Record<string, unknown>) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = document.createElement('template');
    const compiledFunction = pug.compile(template);

    fragment.innerHTML = compiledFunction({ chatList: Object.values(propsAndStubs) });

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      const childContent = child.getContent();
      if (childContent) {
        stub?.replaceWith(childContent);
      }
    });

    return fragment.content;
  }

  public render(): DocumentFragment {
    return this.compile(chatlistTemplate);
  }
}
