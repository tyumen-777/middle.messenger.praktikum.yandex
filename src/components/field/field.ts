import { Block } from '../../utils/Block.ts';
import template from './field.hbs?raw';

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  value?: string | number;
  error?: string;
  help?: string;
  events?: {
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
  };
}

export default class Field extends Block {
  constructor(props: FieldProps) {
    super({ ...props, events: { blur: props.events?.onBlur } });
  }

  protected render(): string {
    // console.log(this.props.events, 'PROPS');
    return template;
  }
}
