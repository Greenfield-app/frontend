import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import Home from "./Home.tsx";
import EatItOrLeaveIt from "./EatItOrLeaveIt.tsx";
import LoginPage from "./LoginPage.tsx";
import CreateAccount from "./CreateAccount.tsx";
import AddNewCard from "./AddNewCard.tsx";
import { FoodInfo, RegisterInfo, UserInfo } from "../vite-env";
import {
  fetchAllRecordsOfSingleUser,
  fetchSingleFoodById,
  getAllAvailableFoods,
} from "../helper/fetchHelper";

function App() {
  // useStates and variables
  const [availableFoods, setAvailableFoods] = useState<FoodInfo[]>([]);
  const [singleUsersFoods, setSingleUsersFoods] = useState<FoodInfo[]>([]);
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
    async function resolveAvailableFoodsPromise() {
      const foodData = await getAllAvailableFoods();
      setAvailableFoods(foodData);
    }
    resolveAvailableFoodsPromise();
  }, []);

  useEffect(() => {
    fetchAllRecordsOfSingleUser(7);
  });

  useEffect(() => {
    async function resolveRecordArrayPromise() {
      const recordData = await fetchAllRecordsOfSingleUser(7); // update the user number based on database or logged in user
      const foodIdArr = recordData.map((record) => record.food_id);
      const foodPromisesArr = foodIdArr.map(
        async (foodId) => await fetchSingleFoodById(foodId)
      );
      Promise.all(foodPromisesArr).then((foodArr) => {
        setSingleUsersFoods(foodArr);
      });
    }
    resolveRecordArrayPromise();
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

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
          setAvailableFoods={setAvailableFoods}
          availableFoods={availableFoods}
          singleUsersFoods={singleUsersFoods}
          currentUser={currentUser}
          setView={setView}
        />
      ) : view === "eatitorleaveit" ? (
        <p>eatitorleaveit</p>
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} setView={setView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
