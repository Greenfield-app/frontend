import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import Home from "./Home.tsx";
import EatItOrLeaveIt from "./EatItOrLeaveIt.tsx";
import LoginPage from "./LoginPage.tsx";
import AddNewCard from "./AddNewCard.tsx";
import CreateAccount from "./CreateAccount.tsx";
import { FoodInfo, registerInfo, UserInfo } from "../vite-env";
import { getAllAvailableFoods } from "../helper/fetchHelper";

function App() {
  // useStates and variables
  const [availableFoods, setAvailableFoods] = useState<FoodInfo[]>([]);
  const [singleUsersFoods, setSingleUsersFoods] = useState<FoodInfo[]>([]);
  const [view, setView] = useState<string | null>("foodlist");
  const [currentUser, setCurrentUser] = useState<UserInfo | string>("guest");
  const [newRegisterInfo, setNewRegisterInfo] = useState<registerInfo>({
    userName: "default userName",
    password: "",
    confirmPassword: "",
  });

  // useEffects
  // changes view is view state updates
  useEffect(() => {
    console.log("view changed");
  }, [view]);

  // pulls available foods from database
  // useEffect(() => {
  //   async function fetchData() {
  //     let foodData = await getAllAvailableFoods();
  //     setAvailableFoods(foodData);
  //   }
  //   fetchData();
  //   console.log(availableFoods);
  // }, []);

  // return
  return (
    <>
      {/* background image whole screen */}
      <div className="bg-image is-unfocused" />
      {/* <p>{fetchedResult}</p> */}

      {view === "home" && currentUser !== "guest" ? ( //use currentUser = 'guest' if user is not logged in. Then they won't see a food list, just the login page by default
        <Home
          availableFoods={availableFoods}
          setAvailableFoods={setAvailableFoods}
          currentUser={currentUser}
          setView={setView}
          view={view}
        />
      ) : view === "createaccount" ? (
        <CreateAccount
          setView={setView}
          newRegisterInfo={newRegisterInfo}
          setNewRegisterInfo={setNewRegisterInfo}
        />
      ) : view === "addnewcard" ? (
        <AddNewCard setView={setView} />
      ) : view === "foodlist" ? (
        <FoodList
          setAvailableFoods={setAvailableFoods}
          availableFoods={availableFoods}
          currentUser={currentUser}
          setView={setView}
        />
      ) : view === "eatitorleaveit" ? (
        <p>eatitorleaveit</p>
      ) : (
        // <EatItOrLeaveIt setView={setView} availableFoods={availableFoods} setFoods={setAvailableFoods} />
        <LoginPage setCurrentUser={setCurrentUser} setView={setView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
