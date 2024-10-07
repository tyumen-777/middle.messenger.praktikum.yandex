import { Block } from '../../utils/Block.ts';

import template from './search-field.hbs?raw';

export default class SearchField extends Block {
  protected render(): string {
    return template;
  }
}
