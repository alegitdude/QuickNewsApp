export interface UserState {
  username: string;
  omittedSources: string[];
}

export interface UserRegisterValues {
  email: string;
  password: string;
  username: string;
}

export interface UserLoginValues {
  email: string;
  password: string;
}
