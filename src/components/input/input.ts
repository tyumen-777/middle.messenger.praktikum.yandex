import Block from '~src/utils/block';
import template from './input.template';

export type InputProps = {
  className?: string;
  placeholder: string;
  name: string;
  type: string;
  events?: Record<string, (e: Event) => void>;
};

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('input', props);
  }

  protected getAttributes() {
    return {
      class: `input ${this.props.className || ''}`,
      placeholder: this.props.placeholder,
      inputName: this.props.name,
      type: this.props.type,
    };
  }

  public get value(): string {
    return (this.element as HTMLInputElement)?.value;
  }

  protected getEvents() {
    return this.props.events ? this.props.events : {};
  }

  render() {
    return this.compile(template);
  }
}
