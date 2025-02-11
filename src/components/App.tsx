import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import Home from "./Home.tsx";
import EatItOrLeaveIt from "./EatItOrLeaveIt.tsx";
import LoginPage from "./LoginPage.tsx";
import CreateAccount from "./CreateAccount.tsx";
import { FoodInfo, RegisterInfo, UserInfo, RecordWithFood } from "../vite-env";
import {
  fetchAllRecordsOfSingleUser,
  fetchSingleFoodById,
} from "../helper/fetchHelper";

function App() {
  // useStates and variables
  const [singleUsersFoods, setSingleUsersFoods] = useState<FoodInfo[]>([]);
  const [recordsWithFood, setRecordsWithFood] = useState<RecordWithFood[]>([]);
  const [view, setView] = useState<string | null>("foodlist");
  const [currentUser, setCurrentUser] = useState<UserInfo>({
    userId: 61,
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
  useEffect(() => {}, [view]);

  // gets all of the foods of a logged in user when currentUser changes
  useEffect(() => {
    async function resolveRecordArrayPromise() {
      const recordData = await fetchAllRecordsOfSingleUser(currentUser.userId); // update the user number based on database or logged in user
      console.log(recordData);
      //foreach, replace map,
      const recordWithFoodArr = recordData.map(async (record) => {
        const foodId = record.foodId;
        const foodResponse = await fetchSingleFoodById(foodId);
        const recordWithFood: RecordWithFood = {
          record: record,
          food: foodResponse,
        };
        return recordWithFood;
      });
      const recordWithFoodArrResolved = await Promise.all(recordWithFoodArr);
      setRecordsWithFood(recordWithFoodArrResolved);
    }
    resolveRecordArrayPromise();
  }, [currentUser, view]);

  useEffect(() => {}, [currentUser]);


  return (
    <>
      {/* background image whole screen */}
      <div className="bg-image is-unfocused" />
      <div className="bg-image is-unfocused" />
      {/* <p>{fetchedResult}</p> */}

      {view === "home" && currentUser.userId !== -1 ? ( //use currentUser = 'guest' if user is not logged in. Then they won't see a food list, just the login page by default
        <Home currentUser={currentUser} setView={setView} view={view} />
      ) : view === "createaccount" ? (
        <CreateAccount
          setCurrentUser={setCurrentUser}
          setView={setView}
          newRegisterInfo={newRegisterInfo}
          setNewRegisterInfo={setNewRegisterInfo}
        />
      ) : view === "foodlist" ? (
        <FoodList
          recordsWithFood={recordsWithFood}
          setRecordsWithFood={setRecordsWithFood}
          setSingleUsersFoods={setSingleUsersFoods}
          singleUsersFoods={singleUsersFoods}
          currentUser={currentUser}
          setView={setView}
        />
      ) : view === "eatitorleaveit" ? (
        <EatItOrLeaveIt currentUser={currentUser} setView={setView} />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} setView={setView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
