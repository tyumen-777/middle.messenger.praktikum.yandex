import HTTPTransport from '../utils/HttpTransport.ts';
import { ICreateChatRequest, IDeleteChatRequest } from './types/ChatApi.types.ts';

export default class ChatApi {
  private http = new HTTPTransport();

  getChats() {
    return this.http.get('/chats');
  }

  createChat(data: ICreateChatRequest) {
    return this.http.post('/chats', { data });
  }

  deleteChat(data: IDeleteChatRequest) {
    return this.http.delete('/chats', { data });
  }

  addUserToChat(usersId: number, chatId: number) {
    return this.http.put('/chats/users', { data: { users: [usersId], chatId } });
  }
}
