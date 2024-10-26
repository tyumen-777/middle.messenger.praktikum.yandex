import ChatApi from '../api/ChatApi.ts';
import { ICreateChatRequest, IDeleteChatRequest } from '../api/types/ChatApi.types.ts';
import store from '../store/Store.ts';

export default class ChatController {
  private api = new ChatApi();

  async getChats() {
    const chats = await this.api.getChats();
    store.set('chats', chats);
  }

  createChat(title: ICreateChatRequest) {
    return this.api.createChat(title);
  }

  deleteChat({ chatId }: IDeleteChatRequest) {
    return this.api.deleteChat({ chatId });
  }

  addUserToChat(usersId: number, chatId: number) {
    return this.api.addUserToChat(usersId, chatId);
  }
}
