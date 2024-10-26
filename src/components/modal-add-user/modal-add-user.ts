import { Block } from '../../utils/Block.ts';
import template from './modal-add-user.hbs?raw';
import { ModalOverlay } from '../modal-overlay';
import { toggleModal } from '../../helpers/toggleModal.ts';
import { INPUT_NAMES, MODAL_NAMES } from '../../constants';
import { Button } from '../button';
import { FieldBlock } from '../field-block';

interface IModalAddUserProps {
  onSubmit: (e: Event) => void;
  submitText: string;
  modalTitle: string;
  modalId: MODAL_NAMES;
  inputLabel: string;
  inputName: INPUT_NAMES;
}

export default class ModalAddUser extends Block {
  inputValue = '';

  constructor(props: IModalAddUserProps) {
    super({
      ...props,
      ModalOverlay: new ModalOverlay({
        onClick: () => toggleModal.closeModal(props.modalId, 'modal__closed'),
      }),
      SubmitButton: new Button({ onClick: props.onSubmit, label: props.submitText }),
      NicknameInput: new FieldBlock({ name: props.inputName, label: props.inputLabel }),
    });
  }

  setInputValue(value: string) {
    this.inputValue = value;
  }

  protected render(): string {
    return template;
  }
}
