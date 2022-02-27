import Block from '~src/utils/block';
import chatSendButtonTemplate from './chatSendButton.template';

export type ChatSendButtonProps = {
  events: Record<string, (e: Event) => void>
};

export default class ChatSendButton extends Block<ChatSendButtonProps> {
  constructor(props: ChatSendButtonProps) {
    super('button', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chat__send-button',
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events;
  }

  public render(): DocumentFragment {
    return this.compile(chatSendButtonTemplate);
  }
}
