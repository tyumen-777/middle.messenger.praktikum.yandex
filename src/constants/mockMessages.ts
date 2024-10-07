export interface MockMessage {
  type: 'income' | 'outcome';
  text: string;
  time: string;
  image?: string | null;
}

interface MockDialogs {
  id: number;
  partner: {
    name: string;
    avatar?: string | null;
  };
  messages: MockMessage[];
}

export const mockMessages: MockDialogs[] = [
  {
    id: 1,
    partner: {
      name: 'Ivan',
      avatar: null,
    },
    messages: [
      {
        type: 'income',
        time: '12:21',
        text: 'Hello World!',
        image: null,
      },
      {
        type: 'outcome',
        time: '12:21',
        text: 'Hello World!',
        image: null,
      },
    ],
  },
  {
    id: 2,
    partner: {
      name: 'Ivan',
      avatar: null,
    },
    messages: [
      {
        type: 'income',
        time: '12:21',
        text: 'Hello World!',
        image: null,
      },
    ],
  },
];
