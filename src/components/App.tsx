import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import Home from "./Home.tsx";
import EatItOrLeaveIt from "./EatItOrLeaveIt.tsx";
import LoginPage from "./LoginPage.tsx";
import AddNewCard from "./AddNewCard.tsx";
import CreateAccount from "./CreateAccount.tsx";
import { FoodInfo, RegisterInfo, UserInfo } from "../vite-env";

function App() {
  // useStates and variables
  const [foods, setFoods] = useState<FoodInfo[]>([]);
  const [view, setView] = useState<string | null>("foodlist");
  const [currentUser, setCurrentUser] = useState<UserInfo | string>("guest");
  const [newRegisterInfo, setNewRegisterInfo] = useState<RegisterInfo>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // useEffects
  useEffect(() => {
    console.log("view changed");
  }, [view]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
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
        <CreateAccount
          setView={setView}
          newRegisterInfo={newRegisterInfo}
          setNewRegisterInfo={setNewRegisterInfo}
        />
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
