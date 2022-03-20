import Block from '~src/utils/block';
import template from './errors.template';

export type ErrorsProps = {
  title: string;
  subtitle: string;
  linkHref: string;
  linkText: string;
};

export default class Errors extends Block<ErrorsProps> {
  constructor(props: ErrorsProps) {
    super('div', props);
  }

  protected getAttributes() {
    return {
      class: 'errors',
    };
  }

  public render() {
    return this.compile(template, {
      title: this.props.title,
      subtitle: this.props.subtitle,
      linkHref: this.props.linkHref,
      linkText: this.props.linkText,
    });
  }
}
