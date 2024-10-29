import { EventBus } from '../utils/EventBus.ts';
import { set } from '../utils/set.ts';
import { Indexed } from '../types/indexed.ts';

export enum StoreEvents {
  UPDATED = 'updated',
}

export interface IUserState {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface IChatState {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message?: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface IMessageState {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

export interface IStoreState {
  user?: IUserState;
  chats?: IChatState[];
  currentChatId?: number;
  messages?: IMessageState[];
}

class Store extends EventBus {
  private state: Indexed = {};

  constructor() {
    super();
    const savedState = localStorage.getItem('storeState');
    if (savedState) {
      this.state = JSON.parse(savedState);
    }
  }

  public getState() {
    return this.state;
  }

  public set = (path: keyof IStoreState, value: unknown) => {
    // localStorage.setItem('storeState', JSON.stringify(this.state));
    set(this.state, path, value);
    this.emit(StoreEvents.UPDATED);
    // console.log(`Path:${path}, Value:${JSON.stringify(value)}`);
  };

  public resetState() {
    localStorage.removeItem('storeState');
  }
}

export default new Store();
