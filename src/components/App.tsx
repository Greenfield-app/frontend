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
  const [view, setView] = useState<string | null>("foodlist");
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
      {/* <p>{fetchedResult}</p> */}

      {view === "foodlist" && currentUser !== "guest" ? ( //use currentUser = 'guest' if user is not logged in. Then they won't see a food list, just the login page by default
        <FoodList
          foods={foods}
          setFoods={setFoods}
          currentUser={currentUser}
          changeView={changeView}
        />
      ) : view === "createaccount" ? (
        <CreateAccount />
      ) : view === "addnewcard" ? (
        <AddNewCard changeView={changeView} />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} changeView={changeView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
