import { Block } from '../../utils/Block.ts';
import template from './button.hbs?raw';

interface ButtonProps {
  variant?: '' | 'secondary' | 'link';
  page?: string;
  label?: string;
  image?: boolean;
  src?: string;
  type?: string;
  onClick?: (e: Event) => void;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  protected render(): string {
    return template;
  }
}
