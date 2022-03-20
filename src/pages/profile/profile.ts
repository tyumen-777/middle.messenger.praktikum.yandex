import Block from '~src/utils/block';
import profileTemplate from './profile.template';

export default class Profile extends Block {
  constructor() {
    super('div');
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'profile__body__container',
    };
  }

  public render(): DocumentFragment {
    return this.compile(profileTemplate);
  }
}
