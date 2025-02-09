import {
  FoodInfo,
  RegisterInfo,
  UserInfo,
  LoginInfo,
  Record,
} from "../vite-env";
const API_URL = import.meta.env.VITE_API_URL as string;

async function sendRegisterInfo<T>(RegisterInfo: RegisterInfo): Promise<T> {
  if (RegisterInfo !== null) {
  }
  const response = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userName: RegisterInfo.userName,
      email: RegisterInfo.email,
      password: RegisterInfo.password,
    }),
  });
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as T;
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

async function fetchSingleFoodById<T>(foodId: number): Promise<FoodInfo> {
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
async function getAllAvailableFoods<T>(): Promise<FoodInfo[]> {
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
async function fetchAllRecordsOfSingleUser<T>(
  userId: number
): Promise<Record[]> {
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
async function sendNewRecord<T>(
  userId: number,
  foodId: number
): Promise<Record> {
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
async function fetchRecommendation<T>(userId: number): Promise<Record[]> {
  //change api, fetch recommendation from backend(backend call those api? not sure ,ask about system design)
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
export {
  sendRegisterInfo,
  vertifyLogin,
  getAllAvailableFoods,
  fetchAllRecordsOfSingleUser,
  fetchSingleFoodById,
  sendNewRecord,
  fetchRecommendation,
};
