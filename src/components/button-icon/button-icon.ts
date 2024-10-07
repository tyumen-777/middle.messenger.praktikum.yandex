import { Block } from '../../utils/Block.ts';
import template from './button-icon.hbs?raw';

interface ButtonIconProps {
  type?: '' | 'secondary';
  page?: string;
  src: string;
  rotate?: number;
  disabled?: boolean;
}
export default class ButtonIcon extends Block {
  constructor(props: ButtonIconProps) {
    super({ ...props });
  }

  protected render(): string {
    return template;
  }
}
