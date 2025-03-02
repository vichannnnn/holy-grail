export interface ResponseData {
  success: boolean;
  message: string;
}

export interface AccountDetails {
  username: string;
  password: string;
  repeat_password: string;
  email: string;
}

export interface ForgotPasswordDetails {
  email: string;
}

export interface UpdatePasswordDetails {
  before_password: string;
  password: string;
  repeat_password: string;
}

export interface UpdateEmailDetails {
  new_email: string;
}
