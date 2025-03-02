export interface LogInDetails {
  username: string;
  password: string;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  role: number;
  verified: boolean;
}

export interface CurrentUserWithJWT {
  data: User;
  access_token: string;
  token_type: string;
  exp: number;
}
