export interface ResponseData {
  success: boolean;
  message: string;
}

export interface AccountDetails {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}

export interface ForgotPasswordDetails {
  email: string;
}
