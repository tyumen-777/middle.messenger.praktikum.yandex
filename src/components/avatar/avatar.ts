import { Block } from '../../utils/Block.ts';
import template from './avatar.hbs?raw';

interface AvatarProps {
  link?: string;
  size: 'small' | 'large';
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({ ...props });
  }

  protected render(): string {
    return template;
  }
}
