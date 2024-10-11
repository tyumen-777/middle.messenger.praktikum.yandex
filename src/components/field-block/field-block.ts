import { Block } from '../../utils/Block.ts';
import { Field } from '../field';
import template from './field-block.hbs?raw';

interface FieldBlockProps {
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

export default class FieldBlock extends Block {
  constructor(props: FieldBlockProps) {
    super({ ...props, Field: new Field({ ...props }) });
  }

  protected render(): string {
    return template;
  }
}
