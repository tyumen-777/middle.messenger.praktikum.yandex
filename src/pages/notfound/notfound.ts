import Block from '~src/utils/block';
import Errors from '~src/components/errors/errors';
import notFoundTemplate from './notfound.template';

export default class Notfound extends Block {
  constructor() {
    super('main');
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'notfound__container',
    };
  }

  protected getChildren(): Record<string, Block> {
    return {
      errorBlock: new Errors({
        title: '404',
        subtitle: 'Страница не найдена',
        linkText: 'Назад к чатам',
        linkHref: '/',
      }),
    };
  }

  public render(): DocumentFragment {
    return this.compile(notFoundTemplate);
  }
}
