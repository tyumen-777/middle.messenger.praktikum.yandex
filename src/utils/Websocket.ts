import store from '../store/Store.ts';
import HTTPTransport from './HttpTransport.ts';

class WS {
  private socket: WebSocket | undefined;

  private host = 'ya-praktikum.tech';

  private chatId: number | undefined;

  private userId: number | undefined;

  isConnected: boolean = false;

  private timerId?: NodeJS.Timeout;

  private onOpenConnection() {
    this.isConnected = true;

    this.getLastMessages();

    console.log('Connected');

    if (!this.timerId) {
      this.timerId = setInterval(() => {
        if (!this.socket) return;
        this.socket.send(
          JSON.stringify({
            type: 'ping',
          }),
        );
      }, 5000);
    }
  }

  private onCloseConnection(event: CloseEvent) {
    console.log(event.wasClean ? 'Соединение закрыто чисто' : 'Обрыв соединения');
    this.isConnected = false;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  private onReceiveMessage(event: MessageEvent) {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.error(error);

      return;
    }
    if (Array.isArray(data)) {
      store.set('messages', data.reverse());
    } else if (data.type === 'message') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      store.set('messages', [...(store.getState().messages || []), data]);
    }
  }

  private onError(event: Event) {
    const errEvent = event as ErrorEvent;
    console.log('Ошибка', errEvent.message);
  }

  sendMessage(message: string) {
    if (this.isConnected && this.socket) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: 'message',
        }),
      );
    }
  }

  private getLastMessages() {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    }
  }

  connect() {
    const chatId = store.getState().currentChatId;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const userId = store.getState()?.user?.id;

    if (!chatId || !userId) {
      throw new Error('Неверный chatId или userId!');
    }

    if (chatId === this.chatId && userId === this.userId) {
      return;
    }

    const http = new HTTPTransport();

    http
      .post<{ token: string }>(`/chats/token/${String(chatId)}`)
      .then((data) => {
        this.socket?.removeEventListener('open', this.onOpenConnection.bind(this));

        this.socket?.removeEventListener('close', this.onCloseConnection.bind(this));

        this.socket?.removeEventListener('message', this.onReceiveMessage.bind(this));

        this.socket?.removeEventListener('error', this.onError.bind(this));

        this.socket?.close(1000, `Close previous chat connection with chat ${this.chatId}`);

        this.socket = new WebSocket(
          `wss://${this.host}/ws/chats/${userId}/${String(chatId)}/${data.token}`,
        );

        this.socket.addEventListener('open', this.onOpenConnection.bind(this));
        this.socket.addEventListener('close', this.onCloseConnection.bind(this));
        this.socket.addEventListener('message', this.onReceiveMessage.bind(this));
        this.socket.addEventListener('error', this.onError.bind(this));

        this.chatId = Number(chatId);
        this.userId = userId;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export const websocket = new WS();
