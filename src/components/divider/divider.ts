import { Block } from '../../utils/Block.ts';
import template from './divider.hbs?raw';

export default class Divider extends Block {
  protected render(): string {
    return template;
  }
}
