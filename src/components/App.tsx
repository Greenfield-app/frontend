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
  const [view, setView] = useState<string | null>("home");
  const [currentUser, setCurrentUser] = useState<UserInfo>({
    userId: 0,
    email: "",
    userName: "",
  });
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

  // pulls available foods from database (if database not set up locally, can change back to sample data in food list)
  useEffect(() => {
    async function resolveAvailableFoodsPromise() {
      const foodData = await getAllAvailableFoods();
      setAvailableFoods(foodData);
    }
    resolveAvailableFoodsPromise();
  }, []);

  // useEffect(() => {
  //   fetchAllRecordsOfSingleUser(currentUser);
  // });

  // gets all of the foods of a logged in user when currentUser changes
  useEffect(() => {
    async function resolveRecordArrayPromise() {
      const recordData = await fetchAllRecordsOfSingleUser(currentUser.userId); // update the user number based on database or logged in user
      const foodIdArr = recordData.map((record) => record.food_id);
      const foodPromisesArr = foodIdArr.map(
        async (foodId) => await fetchSingleFoodById(foodId)
      );
      Promise.all(foodPromisesArr).then((foodArr) => {
        setSingleUsersFoods(foodArr);
      });
    }
    resolveRecordArrayPromise();
  }, [currentUser]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      {/* background image whole screen */}
      <div className="bg-image is-unfocused" />
      {/* <p>{fetchedResult}</p> */}

      {view === "home" && currentUser.userId !== 0 ? ( //use currentUser = 'guest' if user is not logged in. Then they won't see a food list, just the login page by default
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
          setSingleUsersFoods={setSingleUsersFoods}
          singleUsersFoods={singleUsersFoods}
          currentUser={currentUser}
          setView={setView}
        />
      ) : view === "eatitorleaveit" ? (
        <EatItOrLeaveIt
          setView={setView}
          availableFoods={availableFoods}
          setFoods={setAvailableFoods}
        />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} setView={setView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
