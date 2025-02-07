import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import LoginPage from "./LoginPage.tsx";
import AddNewCard from "./AddNewCard.tsx";
import CreateAccount from "./CreateAccount.tsx";
import { FoodInfo, registerInfo, UserInfo } from "../vite-env";

function App() {
  // useStates and variables
  const [foods, setFoods] = useState<FoodInfo[]>([]);
  const [view, setView] = useState<string | null>("foodlist");
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [newRegisterInfo, setNewRegisterInfo] = useState<registerInfo>({
    userName: "default userName",
    password: "",
    confirmPassword: "",
  });

  // useEffects
  useEffect(() => {
    console.log("view changed");
  }, [view]);

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
        <CreateAccount
          changeView={changeView}
          newRegisterInfo={newRegisterInfo}
          setNewRegisterInfo={setNewRegisterInfo}
        />
      ) : view === "addnewcard" ? (
        <AddNewCard changeView={changeView} />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} changeView={changeView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
