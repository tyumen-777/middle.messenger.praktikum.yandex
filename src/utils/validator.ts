import { INPUT_NAMES } from '../constants';

interface ValidateInputProps {
  elementId: INPUT_NAMES;
}

export type FormValues = Record<ValidateInputProps['elementId'], string | number>;

interface ValidationResult {
  valid: boolean;
  inputValue: string | number;
}

export const VALIDATE_REGEX = {
  NAME: '^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$',
  EMAIL: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\\.[a-zA-Z]{2,}$',
  LOGIN: '^(?!\\d+$)[a-zA-Z0-9_-]{3,20}$',
  PHONE: '^\\+?\\d{10,15}$',
  MESSAGE: '^.+$',
  PASSWORD: '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,40}$',
};
const getRegexByElementId = (elementId: INPUT_NAMES) => {
  switch (elementId) {
    case INPUT_NAMES.EMAIL:
      return VALIDATE_REGEX.EMAIL;
    case INPUT_NAMES.FIRST_NAME:
    case INPUT_NAMES.SECOND_NAME:
    case INPUT_NAMES.DISPLAY_NAME:
      return VALIDATE_REGEX.NAME;
    case INPUT_NAMES.PASSWORD:
    case INPUT_NAMES.PASSWORD_AGAIN:
      return VALIDATE_REGEX.PASSWORD;
    case INPUT_NAMES.PHONE:
      return VALIDATE_REGEX.PHONE;
    case INPUT_NAMES.MESSAGE:
      return VALIDATE_REGEX.MESSAGE;
    case INPUT_NAMES.LOGIN:
      return VALIDATE_REGEX.LOGIN;
    default:
      return '';
  }
};
export const validateInput = ({ elementId }: ValidateInputProps): ValidationResult => {
  const input = document.getElementById(elementId) as HTMLInputElement;
  const valid = new RegExp(getRegexByElementId(elementId)).test(input.value);

  return {
    valid,
    inputValue: input.value,
  };
};

export const validateInputs = (inputNames: INPUT_NAMES[]) => {
  // console.log(inputNames);
  const validationResult = inputNames.map((item) => validateInput({ elementId: item }));

  return {
    isValid: validationResult.every((item) => item.valid),
  };
};
