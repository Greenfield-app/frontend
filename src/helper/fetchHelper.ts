import { FoodInfo, RegisterInfo, UserInfo } from "../vite-env";
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
async function sendRegisterInfo<T>(RegisterInfo: RegisterInfo): Promise<T> {
  if (RegisterInfo !== null) {
  }
  const response = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
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
async function vertifySignin<T>(signinInfo: UserInfo): Promise<T> {
  const response = await fetch(`${API_URL}/api/signin`, {
    method: "PATCH",
  });
  try {
    return (await response.json()) as T;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Fetch error");
  }
}
export { fetchHelper, sendRegisterInfo };
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
