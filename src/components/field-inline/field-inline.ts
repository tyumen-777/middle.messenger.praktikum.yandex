import { Block } from '../../utils/Block.ts';
import template from './field-inline.hbs?raw';

interface FieldInlineProps {
  name: string;
  label: string;
  value: string;
  events?: {
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
  };
}

export default class FieldInline extends Block {
  constructor(props: FieldInlineProps) {
    super({ ...props, events: { blur: props.events?.onBlur } });
  }

  protected render(): string {
    return template;
  }
}
