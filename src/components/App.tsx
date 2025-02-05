import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import LoginPage from "./LoginPage.tsx";
import { fetchHelper } from "../helper/fetchHelper.ts";
import CreateAccount from "./CreateAccount.tsx";
const API_URL = import.meta.env.VITE_API_URL as string;
function App() {
  // useStates and variables
  // let url = "http://localhost:8080/";
  // const [foods, setFoods] = useState<string[]>([]);
  const [fetchedResult, setFetchedResult] = useState<null | string>(null);
  const [view, setView] = useState<string | null>("foodlist");
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
  useEffect(() => {
    console.log("view changed");
  }, [view]);

  // handler functions
  // async function getFood() {}

  const changeView = (newView: string): void => {
    setView(newView);
  };

  // return
  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => changeView("foodlist")}>What's Eat</h1>
        <form action="">
          <label htmlFor="">New Food</label>
          <input type="text" />
          <button>Submit</button>
        </form>
        <h1 onClick={() => changeView("createaccount")}>Create Account</h1>
        <h1 onClick={() => changeView("loginpage")}>Login</h1>
      </nav>
      {/* <p>{fetchedResult}</p> */}

      {view === "foodlist" ? (
        <FoodList />
      ) : view === "loginpage" ? (
        <LoginPage />
      ) : view === "createaccount" ? (
        <CreateAccount />
      ) : (
        <p>Something went wrong :/</p>
      )}
    </>
  );
}

export default App;
