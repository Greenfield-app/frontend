import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import Home from "./Home.tsx";
import EatItOrLeaveIt from "./EatItOrLeaveIt.tsx";
import LoginPage from "./LoginPage.tsx";
import CreateAccount from "./CreateAccount.tsx";
import AddNewCard from "./AddNewCard.tsx";
import { FoodInfo, FoodInfoDisplay, RegisterInfo, UserInfo } from "../vite-env";
import { FoodInfo, FoodInfoDisplay, RegisterInfo, UserInfo } from "../vite-env";
import {
  fetchAllRecordsOfSingleUser,
  fetchSingleFoodById,
  getAllAvailableFoods,
} from "../helper/fetchHelper";

function App() {
  // useStates and variables
  const [availableFoods, setAvailableFoods] = useState<FoodInfo[]>([]);
  const [availableFoodsWithImg, setAvailableFoodsWithImg] =
    useState<FoodInfoDisplay | null>();
  const [availableFoodsWithImg, setAvailableFoodsWithImg] =
    useState<FoodInfoDisplay | null>();
  const [singleUsersFoods, setSingleUsersFoods] = useState<FoodInfo[]>([]);
  const [view, setView] = useState<string | null>("home");
  const [currentUser, setCurrentUser] = useState<UserInfo>({
    userId: 10,
    userId: 10,
    email: "",
    userName: "",
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
    console.log(availableFoods);
    console.log(availableFoods);
  }, []);

  // gets all of the foods of a logged in user when currentUser changes
  useEffect(() => {
    async function resolveRecordArrayPromise() {
      const recordData = await fetchAllRecordsOfSingleUser(currentUser.userId); // update the user number based on database or logged in user
      console.log(recordData);
      const foodIdArr = recordData.map((record) => record.foodId);
      console.log(recordData);
      const foodIdArr = recordData.map((record) => record.foodId);
      const foodPromisesArr = foodIdArr.map(
        async (foodId) => await fetchSingleFoodById(foodId)
      );
      Promise.all(foodPromisesArr).then((foodArr) => {
        setSingleUsersFoods(foodArr);
      });
    }
    resolveRecordArrayPromise();
    console.log(singleUsersFoods);
  }, [currentUser, view]);
    console.log(singleUsersFoods);
  }, [currentUser, view]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      {/* background image whole screen */}
      <div className="bg-image is-unfocused" />
      {/* <p>{fetchedResult}</p> */}

      {view === "home" && currentUser.userId !== -1 ? ( //use currentUser = 'guest' if user is not logged in. Then they won't see a food list, just the login page by default
        <Home
          availableFoods={availableFoods}
          setAvailableFoods={setAvailableFoods}
          currentUser={currentUser}
          setView={setView}
          view={view}
        />
      ) : view === "createaccount" ? (
        <CreateAccount
          setCurrentUser={setCurrentUser}
          setCurrentUser={setCurrentUser}
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
          availableFoodsWithImg={availableFoodsWithImg}
          setAvailableFoodsWithImg={setAvailableFoodsWithImg}
          currentUser={currentUser}
          setView={setView}
        />
      ) : (
        <EatItOrLeaveIt
          availableFoodsWithImg={availableFoodsWithImg}
          setAvailableFoodsWithImg={setAvailableFoodsWithImg}
          currentUser={currentUser}
          setView={setView}
        />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} setView={setView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
