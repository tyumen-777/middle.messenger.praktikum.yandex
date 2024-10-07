import { Block } from '../../utils/Block.ts';
import template from './field-inline-block.hbs?raw';
import { FieldInline } from '../field-inline';

interface FieldInlineBlockProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  events?: {
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
  };
}

export default class FieldInlineBlock extends Block {
  constructor(props: FieldInlineBlockProps) {
    super({ ...props, FieldInline: new FieldInline({ ...props }) });
  }

  protected render(): string {
    return template;
  }
}
