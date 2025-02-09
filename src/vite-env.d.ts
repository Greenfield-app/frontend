/// <reference types="vite/client" />

export interface FoodInfo {
  id: number;
  foodName: string;
  description: string | null; // nullable
  // feat top places near me: string[] ?
}
export interface UserInfo {
  userId: number;
  email: string;
  userName: string;
}

export interface RegisterInfo {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterError {
  userName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface LoginError {
  submitted: boolean;
  loginSuccessful: boolean;
}
export interface Record {
  id: number;
  user_id: number;
  food_id: number;
  record_at: string;
}
