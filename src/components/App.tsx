import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import LoginPage from "./LoginPage.tsx";
import AddNewCard from "./AddNewCard.tsx";
import { fetchHelper } from "../helper/fetchHelper.ts";
import CreateAccount from "./CreateAccount.tsx";
import { FoodInfo } from "../vite-env";

const API_URL = import.meta.env.VITE_API_URL as string;
function App() {
  // useStates and variables
  const [foods, setFoods] = useState<FoodInfo[]>([]);
  const [fetchedResult, setFetchedResult] = useState<null | string>(null);
  const [view, setView] = useState<string | null>("loginpage");
  const [currentUser, setCurrentUser] = useState<string | null>("user1");

  // const [text, setText] = useState<null | string>(null);
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_API_URL);
  //   const initialFetch = async () => {
  //     const response = await fetchHelper<{ message: string }>(API_URL);
  //     setFetchedResult(response.message);
  //   };
  //   initialFetch();
  // }, []);

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
        {/* <form action=''>
          <label htmlFor=''>New Food</label>
          <input type='text' />
          <button>Submit</button>
        </form> */}
        <button
          className="btn-addfoodcard"
          onClick={() => changeView("addnewcard")}
        >
          +
        </button>
        <h1 onClick={() => changeView("createaccount")}>Create Account</h1>
        <h1 onClick={() => changeView("loginpage")}>Login</h1>
      </nav>
      {/* <p>{fetchedResult}</p> */}

      {view === "foodlist" && currentUser !== "guest" ? ( //use currentUser = 'guest' if user is not logged in. Then they won't see a food list, just the login page by default
        <FoodList foods={foods} setFoods={setFoods} currentUser={currentUser} />
      ) : view === "createaccount" ? (
        <CreateAccount />
      ) : view === "addnewcard" ? (
        <AddNewCard />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} /> //by default, see login page
      )}
    </>
  );
}

export default App;
