import { Block } from '../../utils/Block.ts';
import template from './modal-change-avatar.hbs?raw';
import { ModalOverlay } from '../modal-overlay';
import { Field } from '../field';
import { Button } from '../button';
import { toggleModal } from '../../helpers/toggleModal.ts';
import UserController from '../../controllers/UserController.ts';
import AuthController from '../../controllers/AuthController.ts';
import { MODAL_NAMES } from '../../constants';

interface IModalChangeAvatarProps {
  onClick?: () => void;
}

export default class ModalChangeAvatar extends Block {
  userController = new UserController();

  authController = new AuthController();

  constructor(props: IModalChangeAvatarProps) {
    console.log(props);
    super({
      ...props,
      ModalOverlay: new ModalOverlay({
        onClick: () => toggleModal.closeModal(MODAL_NAMES.AVATAR_CHANGE_MODAL, 'modal__closed'),
      }),
      InputElement: new Field({
        type: 'file',
        name: 'avatar',
        multiple: false,
        accept: 'image/*',
        id: 'avatar',
      }),
      SubmitButton: new Button({
        label: 'Поменять',
        onClick: () => {
          const input = document.getElementById('avatar') as HTMLInputElement;
          console.log(input?.files);
          if (input?.files?.length) {
            this.userController
              .changeUserAvatar(input.files[0])
              .then(() => {
                toggleModal.closeModal(MODAL_NAMES.AVATAR_CHANGE_MODAL, 'modal__closed');
                void this.authController.getUser();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
      }),
    });
  }

  protected render(): string {
    return template;
  }
}
