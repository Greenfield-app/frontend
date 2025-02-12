import { useEffect, useState } from "react";
import FoodList from "./FoodList.tsx";
import Home from "./Home.tsx";
import EatItOrLeaveIt from "./EatItOrLeaveIt.tsx";
import LoginPage from "./LoginPage.tsx";
import CreateAccount from "./CreateAccount.tsx";
import { FoodInfo, RegisterInfo, UserInfo, RecordWithFood, RestaurantInfo } from "../vite-env";
import {
  fetchAllRecordsOfSingleUser,
  fetchSingleFoodById,
  fetchNearbyRestaurants
} from "../helper/fetchHelper";

function App() {

  // useStates and variables
  const [searchLocation, setSearchLocation] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<string | null>(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<RestaurantInfo[]>([]);


  const [singleUsersFoods, setSingleUsersFoods] = useState<FoodInfo[]>([]);
  const [recordsWithFood, setRecordsWithFood] = useState<RecordWithFood[]>([]);
  const [view, setView] = useState<string | null>("loginpage");
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

  // Effect to get the current position of the device
  useEffect(() => {
    // Define options for geolocation
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };    
    // Success callback
    function success(pos: GeolocationPosition): void {
      const crd = pos.coords;
      setCurrentPosition(`${crd.latitude},${crd.longitude}`);
    }
    // Error Callback
    function error(err: GeolocationPositionError): void {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])

  // Effect to fetch nearby restaurants when current position or search location is updated
  useEffect(() => {
    if (currentPosition) {
      fetchNearbyRestaurants(`restaurants/nearby?coordinates=${currentPosition}`)
        .then(data => {
          setNearbyRestaurants(Array.isArray(data) ? data : []);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    } else if (searchLocation) {
      fetchNearbyRestaurants(`restaurants/nearby?location=${searchLocation}`)
        .then(data => {
          setNearbyRestaurants(Array.isArray(data) ? data : []);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    }
  }, [currentPosition||searchLocation])

  // gets all of the foods of a logged in user when currentUser changes
  useEffect(() => {
    async function resolveRecordArrayPromise() {
      const recordData = await fetchAllRecordsOfSingleUser(currentUser.userId); // update the user number based on database or logged in user

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


  return (
    <>
      {/* background image whole screen */}
      <div className="bg-image is-unfocused" />
      <div className="bg-image is-unfocused" />

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
        <EatItOrLeaveIt currentUser={currentUser} setView={setView} nearbyRestaurants={nearbyRestaurants}/>
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} setView={setView} /> //by default, see login page
      )}
    </>
  );
}

export default App;
