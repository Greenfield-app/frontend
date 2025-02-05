/// <reference types="vite/client" />

export interface FoodInfo {
  id: number;
  name: string;
  description: string | null; // nullable
  // feat top places near me: string[] ?
}
