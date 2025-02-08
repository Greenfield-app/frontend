import { FoodInfo, registerInfo, userInfo, Record } from "../vite-env";
const API_URL = import.meta.env.VITE_API_URL as string;

async function fetchHelper<T>(): Promise<T> {
  const response = await fetch(`${API_URL}/api`, { method: "GET" });
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as T;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}
async function sendRegisterInfo<T>(registerInfo: registerInfo): Promise<T> {
  if (registerInfo !== null) {
  }
  const response = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      userName: registerInfo.userName,
      password: registerInfo.password,
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

async function getAllAvailableFoods<T>(): Promise<FoodInfo[]> {
  const response = await fetch(`${API_URL}/api/foods`, { method: "GET" });
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

async function fetchSingleFoodById<T>(foodId: number): Promise<FoodInfo> {
  const singleFoodResponse = await fetch(`${API_URL}/api/food/${foodId}`, {
    method: "GET",
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

export {
  fetchHelper,
  sendRegisterInfo,
  getAllAvailableFoods,
  fetchAllRecordsOfSingleUser,
  fetchSingleFoodById,
};
//example:
// const [text, setText] = useState<null | string>(null);
// useEffect(() => {
//   console.log(import.meta.env.VITE_API_URL);
//   const initialFetch = async () => {
//     const response = await fetchHelper<{ message: string }>(API_URL);
//     setFetchedResult(response.message);
//   };
//   initialFetch();
// }, []);
