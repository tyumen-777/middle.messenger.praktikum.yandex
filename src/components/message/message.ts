import { Block } from '../../utils/Block.ts';
import template from './message.hbs?raw';

interface MessageProps {
  type: 'outcome' | 'income';
  text?: string;
  image?: string;
  time: string;
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super({ ...props });
  }

  protected render(): string {
    return template;
  }
}
