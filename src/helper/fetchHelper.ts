import { FoodInfo, registerInfo, UserInfo } from "../vite-env";
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

export { fetchHelper, sendRegisterInfo, getAllAvailableFoods };
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
