import Block from '~src/utils/block';
import Errors from '~src/components/errors/errors';
import unavailableTemplate from './unavailable.template';

export default class Unavailable extends Block {
  constructor() {
    super('main');
  }

  protected getChildren(): Record<string, Block> {
    return {
      errorBlock: new Errors({
        title: '500',
        subtitle: 'Мы уже чиним',
        linkText: 'Назад к чатам',
        linkHref: '/',
      }),
    };
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'unavailable__container',
    };
  }

  public render(): DocumentFragment {
    return this.compile(unavailableTemplate);
  }
}
