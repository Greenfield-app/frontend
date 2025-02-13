/// <reference types="vite/client" />

export interface FoodInfo {
  foodId: number;
  foodName: string;
  description: string | null; // nullable
  // feat top places near me: string[] ?
}

export interface FoodInfoDisplay {
  foodName: string;
  image: string;
  imageType: string;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  rating: number;
  totalRatings: number;
  priceLevel: number;
  photoURL: string;
  placeID: string;
}
export interface RandomFoodWithRestaurant {
  randomFoodInfo: FoodInfoDisplay;
  restaurants: RestaurantInfo[];
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
  name: string;
  date: string;
}

export interface NewRestaurant {
  name: string;
  placeID: string;
}

export interface SavedRestaurant {
  id: number,
}

export interface Location {
  latitude: number;
  longitude: number;
}
export interface CachedLocation {
  location: Location;
  timestamp: string;
}
