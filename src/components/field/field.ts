import { Block } from '../../utils/Block.ts';
import template from './field.hbs?raw';

interface FieldProps {
  name: string;
  label?: string;
  id?: string;
  type?: string;
  value?: string | number;
  error?: string;
  help?: string;
  multiple?: boolean;
  accept?: string;
  events?: {
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
  };
}

export default class Field extends Block {
  constructor(props: FieldProps) {
    super({
      ...props,
      events: { blur: props.events?.onBlur, change: props.events?.onChange },
    });
  }

  protected render(): string {
    return template;
  }
}
