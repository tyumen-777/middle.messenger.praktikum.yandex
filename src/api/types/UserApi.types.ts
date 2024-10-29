export interface IUserApiRequest {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IUserApiResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface IUserChangePassRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IUserSearchRequest {
  login: string;
}
