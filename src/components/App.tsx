import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import Home from "./Home.tsx";
import EatItOrLeaveIt from "./EatItOrLeaveIt.tsx";
import LoginPage from "./LoginPage.tsx";
import AddNewCard from "./AddNewCard.tsx";
import CreateAccount from "./CreateAccount.tsx";
import { FoodInfo, registerInfo, UserInfo } from "../vite-env";

function App() {
  // useStates and variables
  const [foods, setFoods] = useState<FoodInfo[]>([]);
<<<<<<< HEAD
  const [view, setView] = useState<string | null>("foodlist");
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [newRegisterInfo, setNewRegisterInfo] = useState<registerInfo>({
    userName: "default userName",
    password: "",
    confirmPassword: "",
  });
=======
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
>>>>>>> main

  // useEffects
  useEffect(() => {
    console.log("view changed");
  }, [view]);

<<<<<<< HEAD
  const changeView = (newView: string): void => {
    setView(newView);
  };
=======
  // handler functions
  // async function getFood() {}
>>>>>>> main

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
<<<<<<< HEAD
        <CreateAccount
          changeView={changeView}
          newRegisterInfo={newRegisterInfo}
          setNewRegisterInfo={setNewRegisterInfo}
        />
=======
        <CreateAccount setView={setView} />
>>>>>>> main
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
