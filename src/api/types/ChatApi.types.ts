export interface ICreateChatRequest {
  title: string;
}

export interface IDeleteChatRequest {
  chatId: number;
}

export interface IGetChatResponse {
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
