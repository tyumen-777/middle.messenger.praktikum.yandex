export interface IAuthSignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IAuthSignUpResponse {
  id: number;
}

export interface IAuthSignInRequest {
  login: string;
  password: string;
}
