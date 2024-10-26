import { Block } from '../../utils/Block.ts';
import template from './button-icon.hbs?raw';

interface ButtonIconProps {
  type?: '' | 'secondary';
  page?: string;
  src: string;
  rotate?: number;
  disabled?: boolean;
  onClick?: (e: Event) => void;
}
export default class ButtonIcon extends Block {
  constructor(props: ButtonIconProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  protected render(): string {
    return template;
  }
}
