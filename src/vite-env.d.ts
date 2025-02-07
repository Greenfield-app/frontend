/// <reference types="vite/client" />

export interface FoodInfo {
  id: number;
  name: string;
  description: string | null; // nullable
  // feat top places near me: string[] ?
}
export interface UserInfo {
  userId: number;
  userName: string;
  password: string;
}

export interface registerInfo {
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface signupError {
  userName: boolean;
  password: boolean;
  confirmPassword: boolean;
}
export interface signinError {
  userName: boolean;
  password: boolean;
}
