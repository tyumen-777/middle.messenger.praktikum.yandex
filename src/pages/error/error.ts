import { Block } from '../../utils/Block.ts';
import template from './error.hbs?raw';
import { Button } from '../../components';

export default class ErrorPage extends Block {
  constructor(props: any) {
    super({
      ...props,
      BackButton: new Button({ label: 'Назад к чатам', type: 'link', page: 'chats' }),
    });
  }

  protected render(): string {
    return template;
  }
}
