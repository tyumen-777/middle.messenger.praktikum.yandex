import Block from '~src/utils/block';
import template from './chatCard.template';

export type ChatCardProps = {
  name: string;
  message: string;
  events?: Record<string, (e: Event) => void>
};

export default class ChatCard extends Block<ChatCardProps> {
  constructor(props: ChatCardProps) {
    super('div', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'chat__card',
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events || {};
  }

  public render(): DocumentFragment {
    return this.compile(template, {
      name: this.props.name,
      message: this.props.message,
    });
  }
}
