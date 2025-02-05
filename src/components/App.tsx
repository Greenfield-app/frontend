import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import { fetchHelper } from "../helper/fetchHelper.ts";
const API_URL = import.meta.env.VITE_API_URL as string;
function App() {
  // useStates and variables
  // let url = "http://localhost:8080/";
  // const [foods, setFoods] = useState<string[]>([]);
  const [fetchedResult, setFetchedResult] = useState<null | string>(null);
  // const [text, setText] = useState<null | string>(null);
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    const initialFetch = async () => {
      const response = await fetchHelper<{ message: string }>(API_URL);
      setFetchedResult(response.message);
    };
    initialFetch();
  });
  // useEffects
  // useEffect(() => {
  //   getFood();
  // }, []);

  // handler functions
  // async function getFood() {}
  // return
  return (
    <>
      <nav className="l-header">
        <h1>What's Eat</h1>
      </nav>
      <p>{fetchedResult}</p>

      <FoodList />
    </>
  );
}

export default App;
