import { Block } from '../../utils/Block.ts';
import template from './modal-overlay.hbs?raw';

interface IModalOverlayProps {
  onClick: (e: MouseEvent) => void;
}

export default class ModalOverlay extends Block {
  constructor(props: IModalOverlayProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  protected render(): string {
    return template;
  }
}
