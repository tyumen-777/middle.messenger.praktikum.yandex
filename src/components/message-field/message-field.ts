import { Block } from '../../utils/Block.ts';
import template from './message-field.hbs?raw';

interface MessageFieldProps {
  value?: string | number;
  events?: {
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
  };
}

export default class MessageField extends Block {
  constructor(props: MessageFieldProps) {
    super({ ...props, events: { blur: props.events?.onBlur } });
  }

  protected render(): string {
    return template;
  }
}
