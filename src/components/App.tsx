import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import Home from "./Home.tsx";
import EatItOrLeaveIt from "./EatItOrLeaveIt.tsx";
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
  const [view, setView] = useState<string | null>("home"); // possible views: login, createaccount, home, foodlist,
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

  // return
  return (
    <>
      {/* <p>{fetchedResult}</p> */}

      {view === "home" && currentUser !== "guest" ? ( //use currentUser = 'guest' if user is not logged in. Then they won't see a food list, just the login page by default
        <Home
          foods={foods}
          setFoods={setFoods}
          currentUser={currentUser}
          setView={setView}
          view={view}
        />
      ) : view === "createaccount" ? (
        <CreateAccount setView={setView} />
      ) : view === "addnewcard" ? (
        <AddNewCard setView={setView} />
      ) : view === "foodlist" ? (
        <FoodList
          setFoods={setFoods}
          foods={foods}
          currentUser={currentUser}
          setView={setView}
        />
      ) : view === "eatitorleaveit" ? (
        <EatItOrLeaveIt setView={setView} />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} setView={setView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
