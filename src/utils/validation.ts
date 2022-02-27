export enum VALIDATION_INPUT {
  NAME,
  LOGIN,
  EMAIL,
  PASSWORD,
  PHONE,
  MESSAGE,
  REPEATED_PASSWORD,
}

export const validation = (
  validationInput: VALIDATION_INPUT,
  value: string,
  validValue?: string,
): { isValid: boolean; message: string } => {
  switch (validationInput) {
    case VALIDATION_INPUT.NAME:
      return {
        isValid: /^[A-ZА-Я][а-яa-z]+$/.test(value),
        message:
          'Некорректное имя. Допускается использование латиницы или кириллицы. Первая буква заглавная. Возможно использование дефиса.',
      };
    case VALIDATION_INPUT.LOGIN:
      return {
        isValid: /^[\w-]{3,20}[a-zA-Zа-яА-Я]+[0-9]*$/.test(value),
        message: 'Некорректный логин. Допустима латиница от 3 до 20 символов.',
      };
    case VALIDATION_INPUT.EMAIL:
      return {
        isValid: /^[\w-.]+@[a-zA-Z]+\.[\w-]*$/.test(value),
        message: 'Некорректный email.',
      };
    case VALIDATION_INPUT.PASSWORD:
      return {
        isValid: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/.test(value),
        message: 'Некорректный пароль',
      };
    case VALIDATION_INPUT.REPEATED_PASSWORD:
      return {
        isValid: value !== validValue,
        message: 'Пароли не совпадают',
      };
    case VALIDATION_INPUT.PHONE:
      return {
        isValid: /^[\d+][\d]{10,15}$/.test(value),
        message: 'Некорректный телефон',
      };
    case VALIDATION_INPUT.MESSAGE:
      return {
        isValid: !value.length,
        message: 'Сообщение не должно быть пустым',
      };
    default: {
      return {
        isValid: true,
        message: '',
      };
    }
  }
};
