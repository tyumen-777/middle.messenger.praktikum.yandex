import { VALIDATION_INPUT, validation } from '~src/utils';
import Block from '~src/utils/block';
import Input, { InputProps } from '~src/components/input/input';
import validInputTemplate from './valid-input.template';

export type ValidInputProps = {
  isValid: boolean;
  validationName: VALIDATION_INPUT;
  validationMessage?: string;
  withoutValidationMessage?: boolean;
};

export default class ValidInput extends Block<ValidInputProps & InputProps> {
  constructor(props: ValidInputProps & InputProps) {
    super('div', props);
  }

  protected getChildren(): Record<string, Block<InputProps>> {
    const loginField = new Input({
      ...this.props,
      events: {
        blur: this.validate.bind(this),
      },
    });

    return {
      loginField,
    };
  }

  protected getAttributes(): Record<string, string> {
    return ({
      class: 'valid-input',
    });
  }

  public get value(): string {
    return this.children.loginField.value;
  }

  public validate(referenceValue?: string) {
    const { validationName, withoutValidationMessage } = this.props;
    const {
      isValid,
      message,
    } = validation(validationName, this.children.loginField.value, referenceValue);
    this.setProps({
      validationMessage: isValid || withoutValidationMessage ? '' : message,
    });
  }

  public render(): DocumentFragment {
    return this.compile(validInputTemplate, {
      loginValidationMessage: this.props.validationMessage || '',
    });
  }
}
