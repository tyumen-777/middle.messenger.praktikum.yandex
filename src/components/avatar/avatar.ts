import { Block } from '../../utils/Block.ts';
import template from './avatar.hbs?raw';

interface AvatarProps {
  link?: string;
  size: 'small' | 'large';
  onClick?: (e: Event) => void;
  title?: string;
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    console.log(props);
    super({ ...props, events: { click: props.onClick } });
  }

  protected render(): string {
    return template;
  }
}
