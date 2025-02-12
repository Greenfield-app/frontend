import {
  FoodInfo,
  RegisterInfo,
  UserInfo,
  LoginInfo,
  Record,
  Location,
  RandomFoodWithRestaurant,
  CachedLocation,
  RestaurantInfo,
} from "../vite-env";
import axios from 'axios';

// Create an Axios instance with base URL and timeout settings
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  withCredentials: true,
});

const API_URL = import.meta.env.VITE_API_URL as string;
const CACHE_KEY_LOCATION = "ip_location_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

async function sendRegisterInfo(registerInfo: RegisterInfo): Promise<UserInfo> {
  if (registerInfo !== null) {
  }
  const response = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userName: registerInfo.userName,
      email: registerInfo.email,
      password: registerInfo.password,
    }),
  });
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as UserInfo;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

async function vertifyLogin<T>(loginInfo: LoginInfo): Promise<T> {
  const response = await fetch(`${API_URL}/api/signin`, {
    method: "PATCH",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: loginInfo.email,
      password: loginInfo.password,
    }),
  });
  try {
    if (!response.ok) {
      console.error("RES ERROR ", response);
      throw new Error(response.statusText);
    }
    return (await response.json()) as T;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

async function fetchSingleFoodById(foodId: number): Promise<FoodInfo> {
  const singleFoodResponse = await fetch(`${API_URL}/api/food/${foodId}`, {
    method: "GET",
    credentials: "include",
  });
  try {
    if (!singleFoodResponse.ok) {
      throw new Error(singleFoodResponse.statusText);
    }
    return (await singleFoodResponse.json()) as FoodInfo;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

async function addNewFood(foodName: string): Promise<FoodInfo> {
  const newFoodResponse = await fetch(`${API_URL}/api/new-food`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ foodName: foodName, description: null }),
    // body: JSON.stringify({ foodName: foodName, description: null }),
  });
  try {
    if (!newFoodResponse.ok) {
      throw new Error(newFoodResponse.statusText);
    }
    return (await newFoodResponse.json()) as FoodInfo;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

async function fetchAllRecordsOfSingleUser(userId: number): Promise<Record[]> {
  const usersRecordsResponse = await fetch(`${API_URL}/api/records/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  try {
    if (!usersRecordsResponse.ok) {
      throw new Error(usersRecordsResponse.statusText);
    }
    return (await usersRecordsResponse.json()) as Record[];
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

async function deleteRecordById(recordId: number): Promise<Record> {
  const deleteRecordResponse = await fetch(
    `${API_URL}/api/record/${recordId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  try {
    if (!deleteRecordResponse.ok) {
      throw new Error(deleteRecordResponse.statusText);
    }
    return (await deleteRecordResponse.json()) as Record;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

async function sendNewRecord(userId: number, foodId: number): Promise<Record> {
  const newRecord = await fetch(`${API_URL}/api/record/${userId}/${foodId}`, {
    method: "POST",
    credentials: "include",
  });
  try {
    if (!newRecord.ok) {
      throw new Error(newRecord.statusText);
    }
    return (await newRecord.json()) as Record;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

async function fetchRecommendation(): Promise<RandomFoodWithRestaurant> {
  const location: Location = await fetchLocationByIP();
  const url = new URL(`${API_URL}/api/random`);
  if (location) {
    url.searchParams.append("latitude", location.latitude.toString());
    url.searchParams.append("longitude", location.longitude.toString());
  }

  const randomFoodResponse = await fetch(`${url.toString()}`, {
    method: "GET",
    credentials: "include",
  });
  try {
    if (!randomFoodResponse.ok) {
      throw new Error(randomFoodResponse.statusText);
    }
    return (await randomFoodResponse.json()) as RandomFoodWithRestaurant;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

async function fetchLocationByIP(): Promise<Location> {
  //get cached location first
  let cachedData = localStorage.getItem(CACHE_KEY_LOCATION);
  if (cachedData) {
    const oldCachedLocation: CachedLocation = JSON.parse(cachedData);
    const timeNow = Date.now();
    if (timeNow - Number(oldCachedLocation.timestamp) < CACHE_DURATION) {
      return oldCachedLocation.location;
    }
  }
  //if cached data not exist, fetch new location
  try {
    const response = await fetch("https://ipapi.co/json/", {
      mode: "cors",
      credentials: "omit",
      headers: {
        Accept: "application/json",
      },
    });

    const pardedResponse = await response.json();
    const location = {
      latitude: pardedResponse.latitude,
      longitude: pardedResponse.longitude,
    };
    const newCachedLocatio: CachedLocation = {
      location: location,
      timestamp: Date.now().toString(),
    };
    localStorage.setItem(CACHE_KEY_LOCATION, JSON.stringify(newCachedLocatio));
    return location;
  } catch (error) {
    const location: Location = {
      latitude: 35.65,
      longitude: 139.73333,
    };
    const newCachedLocatio: CachedLocation = {
      location: location,
      timestamp: Date.now().toString(),
    };
    localStorage.setItem(CACHE_KEY_LOCATION, JSON.stringify(newCachedLocatio));
    return location;
  }
}

async function fetchNearbyRestaurants (endpoint: string) : Promise<Array<RestaurantInfo>> {
  try {
      const response = await instance.get(endpoint);

      // Check if the response contains an array of restaurants
      if (Array.isArray(response.data)) {
          // Map through the array and extract the necessary fields for each restaurant
          return response.data.map((restaurant: any) => {
              return {
                  name: restaurant.name,
                  address: restaurant.address,
                  rating: restaurant.rating,
                  totalRatings: restaurant.totalRatings,
                  priceLevel: restaurant.priceLevel,
                  photoURL: restaurant.photoURL,
              };
          })
      }
      // Return an empty array if no restaurants were found
      return [];
  } catch (error) {
      console.error('Error fetching restaurants: ', error);
      throw error;
  }
}

export {
  sendRegisterInfo,
  vertifyLogin,
  fetchAllRecordsOfSingleUser,
  fetchSingleFoodById,
  sendNewRecord,
  fetchRecommendation,
  addNewFood,
  deleteRecordById,
  fetchLocationByIP,
  fetchNearbyRestaurants,
};
