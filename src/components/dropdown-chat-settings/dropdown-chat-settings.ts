import { Block } from '../../utils/Block.ts';

import template from './dropdown-chat-settings.hbs?raw';
import { Button } from '../button';
import { toggleDropDown } from '../../helpers/toggleDropDown.ts';
import { DROPDOWN_NAMES, MODAL_NAMES } from '../../constants';
import { toggleModal } from '../../helpers/toggleModal.ts';
import ChatController from '../../controllers/ChatController.ts';
import store from '../../store/Store.ts';

export default class DropdownChatSettings extends Block {
  chatController = new ChatController();

  constructor(props: any) {
    super({
      ...props,
      AddUser: new Button({
        label: 'Добавить пользователя',
        variant: 'secondary',
        onClick: (e) => {
          const { currentChatId } = store.getState();
          if (currentChatId) {
            toggleDropDown(e, DROPDOWN_NAMES.CHAT_OPTIONS);
            toggleModal.openModal(MODAL_NAMES.CHAT_ADD_USER, 'modal__closed');
            return false;
          }
          alert('Выберите чат');
        },
      }),
      DeleteUser: new Button({
        label: 'Удалить пользователя',
        variant: 'secondary',
        onClick: (e) => {
          toggleDropDown(e, DROPDOWN_NAMES.CHAT_OPTIONS);
          toggleModal.openModal(MODAL_NAMES.CHAT_DELETE_USER, 'modal__closed');
        },
      }),
      DeleteChat: new Button({
        label: 'Удалить чат',
        variant: 'secondary',
        onClick: (e) => {
          const { currentChatId } = store.getState();
          if (currentChatId) {
            this.chatController
              .deleteChat({ chatId: Number(currentChatId) })
              .then(() =>
                this.chatController.getChats().then(() => {
                  toggleDropDown(e, DROPDOWN_NAMES.CHAT_OPTIONS);
                  store.set('currentChatId', undefined);
                }),
              )
              .catch((err) => console.log(err));
            return false;
          }
          alert('Выберите чат');
        },
      }),
    });
  }

  protected render(): string {
    return template;
  }
}
