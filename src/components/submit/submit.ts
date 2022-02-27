import Block from '~src/utils/block';
import submitTemplate from './submit.template';

export type SubmitProps = {
  className?: string;
  text: string;
  events?: Record<string, (e: Event) => void>;
};

export default class Submit extends Block<SubmitProps> {
  constructor(props: SubmitProps) {
    super('button', props);
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: `submit ${this.props.className || ''}`,
    };
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events ? this.props.events : {};
  }

  public render(): DocumentFragment {
    return this.compile(submitTemplate, { text: this.props.text });
  }
}
