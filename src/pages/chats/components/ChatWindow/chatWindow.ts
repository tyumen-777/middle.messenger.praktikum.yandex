import ValidInput from '~src/components/valid-input/valid-input';
import ChatSendButton from '~src/pages/chats/components/ChatSendButton/chatSendButton';
import { VALIDATION_INPUT } from '~src/utils';
import Block from '~src/utils/block';
import chatWindowTemplate from './chatWindow.template';

export default class ChatWindow extends Block {
  constructor() {
    super('div');
  }

  protected getChildren(): Record<string, Block<{}>> {
    const messageInput = new ValidInput({
      className: 'chat__window_message-input',
      isValid: false,
      validationName: VALIDATION_INPUT.MESSAGE,
      placeholder: 'Сообщение',
      name: 'message',
      type: 'text',
      withoutValidationMessage: true,
    });

    const sendButton = new ChatSendButton({
      events: {
        click: (event) => {
          event.preventDefault();
          messageInput.validate();

          // eslint-disable-next-line no-console
          console.log('CHAT_FORM DATA', {
            message: messageInput.value,
          });
        },
      },
    });

    return {
      messageInput,
      sendButton,
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chat__window',
    };
  }

  public render(): DocumentFragment {
    return this.compile(chatWindowTemplate);
  }
}
