/// <reference types="vite/client" />

export interface FoodInfo {
  id: number;
  name: string;
  description: string | null; // nullable
  // feat top places near me: string[] ?
}
export interface UserInfo {
  userId: number;
  email: string;
  userName: string;
  password: string;
}

export interface RegisterInfo {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupError {
  userName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}
export interface SigninError {
  userName: boolean;
  email: boolean;
  password: boolean;
}
