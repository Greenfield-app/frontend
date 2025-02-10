import {
  FoodInfo,
  RegisterInfo,
  UserInfo,
  LoginInfo,
  Record,
  Location,
  RandomFoodWithRestaurant,
} from "../vite-env";
const API_URL = import.meta.env.VITE_API_URL as string;

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
      console.log("RES ERROR ", response);
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

async function getAllAvailableFoods(): Promise<FoodInfo[]> {
  const response = await fetch(`${API_URL}/api/foods`, {
    method: "GET",
    credentials: "include",
  });
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as FoodInfo[];
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
async function sendNewRecord(userId: number, foodId: number): Promise<Record> {
  console.log(userId, foodId);
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
  try {
    const response = await fetch("https://ipapi.co/json/");
    const pardedResponse = await response.json();
    const location = {
      latitude: pardedResponse.latitude,
      longitude: pardedResponse.longitude,
      city: pardedResponse.city,
    };
    console.log(location);
    return location;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}

export {
  sendRegisterInfo,
  vertifyLogin,
  getAllAvailableFoods,
  fetchAllRecordsOfSingleUser,
  fetchSingleFoodById,
  sendNewRecord,
  fetchRecommendation,
  addNewFood,
  fetchLocationByIP,
};
