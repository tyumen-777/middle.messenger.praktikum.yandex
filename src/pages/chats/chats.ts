import { Block } from '../../utils/Block.ts';
import template from './chats.hbs?raw';
import {
  Avatar,
  Button,
  ButtonIcon,
  ChatsListMessage,
  DropdownChatSettings,
  Message,
  MessageField,
  ModalAddUser,
  SearchField,
} from '../../components';
import { ArrowIcon, AttachIcon, ChatMenuIcon } from '../../assets/icons';
import { validateInput } from '../../utils/validator.ts';
import { DROPDOWN_NAMES, INPUT_NAMES, MODAL_NAMES, ROUTES } from '../../constants';
import ChatController from '../../controllers/ChatController.ts';
import connect from '../../utils/connect.ts';
import { IMessageState, IStoreState } from '../../store/Store.ts';
import { toggleDropDown } from '../../helpers/toggleDropDown.ts';
import { toggleModal } from '../../helpers/toggleModal.ts';
import AuthController from '../../controllers/AuthController.ts';
import UserController from '../../controllers/UserController.ts';
import { websocket } from '../../utils/Websocket.ts';
import { getTime } from '../../helpers/getTime.ts';

class Chats extends Block {
  public state = {};

  public chatController = new ChatController();

  public authController = new AuthController();

  public userController = new UserController();

  constructor(props: any) {
    super({
      ...props,
      ProfileButton: new Button({
        page: 'profile',
        label: 'Профиль >',
        variant: 'secondary',
        onClick: () => {
          window.router.go(ROUTES.PROFILE_PAGE);
        },
      }),
      SearchField: new SearchField(),
      UserAvatar: new Avatar({ size: 'small' }),
      ProfileAvatar: new Avatar({ size: 'small', link: props?.user?.avatar }),
      MenuButton: new ButtonIcon({
        type: 'secondary',
        src: ChatMenuIcon,
        onClick: (e) => toggleDropDown(e, DROPDOWN_NAMES.CHAT_OPTIONS),
      }),
      AttachButton: new ButtonIcon({ type: 'secondary', src: AttachIcon }),
      MessageField: new MessageField({
        value: undefined,
        // events: {
        //   onBlur: () => {
        //     const { valid, inputValue } = validateInput({ elementId: INPUT_NAMES.MESSAGE });
        //     if (valid) {
        //       this.setState(INPUT_NAMES.MESSAGE, inputValue);
        //       this.children.SubmitIcon.setProps({ disabled: false });
        //     } else {
        //       this.children.SubmitIcon.setProps({ disabled: true });
        //     }
        //   },
        // },
      }),
      SubmitIcon: new ButtonIcon({
        rotate: 180,
        src: ArrowIcon,
        onClick: (e) => this.sendMessage(e),
      }),
      ChatSettingsDropdown: new DropdownChatSettings({ ...props }),
      ModalAddUser: new ModalAddUser({
        onSubmit: () => this.addUserToChat(),
        submitText: 'Добавить',
        modalId: MODAL_NAMES.CHAT_ADD_USER,
        modalTitle: 'Добавить пользователя',
        inputLabel: 'Логин',
        inputName: INPUT_NAMES.NICKNAME,
      }),
      ModalDeleteUser: new ModalAddUser({
        onSubmit: () => console.log(123),
        submitText: 'Удалить',
        modalId: MODAL_NAMES.CHAT_DELETE_USER,
        modalTitle: 'Удалить пользователя',
        inputLabel: 'Логин',
        inputName: INPUT_NAMES.NICKNAME,
      }),
      ModalCreateChat: new ModalAddUser({
        onSubmit: () => {
          const { inputValue, valid } = validateInput({ elementId: INPUT_NAMES.CHAT_NAME });
          if (valid) {
            this.createChat(String(inputValue));
          }
        },
        submitText: 'Создать',
        modalId: MODAL_NAMES.CREATE_CHAT,
        modalTitle: 'Введите название чата',
        inputLabel: 'Название чата',
        inputName: INPUT_NAMES.CHAT_NAME,
      }),
      CreateChat: new Button({
        label: 'Создать чат',
        onClick: () => toggleModal.openModal(MODAL_NAMES.CREATE_CHAT),
      }),
    });
  }

  protected render(): string {
    return template;
  }

  sendMessage(e: Event) {
    e.preventDefault();
    const { inputValue, valid } = validateInput({ elementId: INPUT_NAMES.MESSAGE });
    if (inputValue && valid) {
      websocket.sendMessage(String(inputValue));
    }
    const input = document.getElementById('message') as HTMLInputElement;
    input.value = '';

    setTimeout(() => {
      input.focus();
    }, 300);

    console.log(inputValue);
  }

  componentDidUpdate(_oldProps: any, _newProps: any): boolean {
    if (_oldProps.user !== _newProps.user) {
      this.children.ProfileAvatar.setProps({ link: _newProps.user.avatar });
    }

    if (_oldProps.messages !== _newProps.messages) {
      this.props.Messages = _newProps.messages.map(
        (message: IMessageState) =>
          new Message({
            time: getTime(message.time),
            text: message.content,
            type: message.user_id === this.props.user.id ? 'outcome' : 'income',
          }),
      );
      console.log(_newProps, '_newProps');
    }

    if (
      _oldProps.currentChatId !== _newProps.currentChatId ||
      _oldProps.chats !== _newProps.chats
    ) {
      this.props.ChatsList = _newProps.chats.map(
        (chat: any) => new ChatsListMessage(chat, _newProps.currentChatId === chat.id),
      );
      this.props.selectedChat = _newProps.currentChatId !== undefined;
      this.children.ChatSettingsDropdown.setProps({ currentChatId: _newProps.currentChatId });
    }

    return true;
  }

  protected componentDidMount() {
    this.chatController
      .getChats()
      .then(() => this.authController.getUser())
      .catch((err) => {
        console.log(err);
      });
  }

  createChat(title: string) {
    this.chatController
      .createChat({ title })
      .then(() => toggleModal.closeModal(MODAL_NAMES.CREATE_CHAT))
      .then(() => this.chatController.getChats())
      .catch((err) => console.log(err));
  }

  setState(key: string, value: unknown) {
    return (this.state = { ...this.state, [key]: value });
  }

  addUserToChat() {
    const { inputValue } = validateInput({ elementId: INPUT_NAMES.NICKNAME });
    if (inputValue && this.props.currentChatId) {
      this.userController
        .searchUser({ login: String(inputValue) })
        .then((data) => {
          if (!data.length) {
            alert('Ничего не найдено');
            return;
          }
          this.chatController
            .addUserToChat(data[0].id, this.props.currentChatId)
            .then(() => {
              toggleModal.closeModal(MODAL_NAMES.CHAT_ADD_USER);
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => console.log(error));
    }
  }
}

function mapStateToProps(store: IStoreState) {
  return {
    user: store.user,
    chats: store.chats,
    currentChatId: store.currentChatId,
    messages: store.messages,
  };
}
export default connect(mapStateToProps)(Chats);
