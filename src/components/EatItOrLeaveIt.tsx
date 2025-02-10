import "../styles/modules/eatitorleaveit.css";
<<<<<<< HEAD
import { FoodInfo, UserInfo } from "../vite-env";
import { sendNewRecord } from "../helper/fetchHelper";
=======
import { FoodInfo, UserInfo, FoodInfoDisplay } from "../vite-env";
import {
  sendNewRecord,
  fetchRecommendation,
  addNewFood,
} from "../helper/fetchHelper";
>>>>>>> 4448e3421dd36582cc940cc09b2f547c0626f388
import { useState, useEffect, MouseEvent } from "react";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";

interface EatItOrLeaveItProps {
  currentUser: UserInfo;
  setView: Function;
<<<<<<< HEAD
  availableFoods: FoodInfo[];
  singleUsersFoods: FoodInfo[];
  setAvailableFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>;
=======
  availableFoodsWithImg: FoodInfoDisplay;
  setAvailableFoodsWithImg: (foodInfoDisplay: FoodInfoDisplay) => void;
>>>>>>> 4448e3421dd36582cc940cc09b2f547c0626f388
}

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = ({
  currentUser,
  setView,
<<<<<<< HEAD
  singleUsersFoods,
  setAvailableFoods,
  availableFoods,
}) => {
  // random food for picking recommendation from foods array
  //need this food's id to send fetch
  const [randomFood, setRandomFood] = useState<FoodInfo>(availableFoods[0]);

  // eventually want to use this to make random food suggestion

  const handleDeleteFood = (e: MouseEvent<HTMLImageElement>) => {
    console.log(e, " was deleted!");
    //change to get next food
  };

  const handleEatFood = async (e: MouseEvent<HTMLImageElement>) => {
    console.log(e, "was eaten!");
    console.log(currentUser, randomFood.foodId, " was eaten!");
    const response = await sendNewRecord(currentUser.userId, randomFood.foodId);
    console.log(response);
    // send to database Records of when eaten
  };

  useEffect(() => {
    console.log(randomFood);
=======
  availableFoodsWithImg,
  setAvailableFoodsWithImg,
}) => {
  // random food for picking recommendation from foods array
  const [randomFood, setRandomFood] = useState<FoodInfoDisplay | null>(null);
  const getNextFood = async () => {
    const recommendationResponse: FoodInfoDisplay = await fetchRecommendation(
      0
    );
    console.log(recommendationResponse);
    setRandomFood(recommendationResponse);
  };
  useEffect(() => {
    const resolveRecommendation = async () => {
      const recommendationResponse: FoodInfoDisplay = await fetchRecommendation(
        0
      );
      console.log(recommendationResponse);
      setRandomFood(recommendationResponse);
    };
    resolveRecommendation();
>>>>>>> 4448e3421dd36582cc940cc09b2f547c0626f388
  }, []);

  useEffect(() => {}, [randomFood]);
  const handleDeleteFood = (e: MouseEvent<HTMLImageElement>) => {
    console.log(e, " was deleted!");
    getNextFood();
    //change to get next food
  };

  const handleEatFood = async (e: MouseEvent<HTMLImageElement>) => {
    console.log(randomFood, " was eaten!");
    //not guest: send record to db
    if (currentUser && currentUser.userId !== 0) {
      if (randomFood && randomFood.foodName) {
        try {
          const foodInfoResponse = await addNewFood(randomFood.foodName);
          if (foodInfoResponse) {
            console.log(foodInfoResponse);
            const response = await sendNewRecord(
              currentUser.userId,
              foodInfoResponse.foodId
            );
            console.log(response);
          }
        } catch (error) {
          console.error(error, "Current user do not exist in database");
        }
      }
    }
    //if guest or user not exist, just get another random food
    getNextFood();
  };

  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => setView("home")}>What's Eat</h1>
        <h1 onClick={() => setView("loginpage")}>Logout</h1>
      </nav>
      <div className="eatitorleaveit-container">
        <h1>Eat it or leave it</h1>
        {/* <h2>{randomFood.name}</h2> currently doesn't work, will need to refactor*/}

<<<<<<< HEAD
        <li className="food">
          <img
            className="food-delete-icon"
            src={trashIcon}
            alt="eat icon"
            onClick={(e) => handleDeleteFood(e)}
          />
          <h3 className="food-title">Ramen</h3>
          <img
            className="food-eat-icon"
            src={eatIcon}
            alt="red trash icon"
            onClick={(e) => handleEatFood(e)}
          />
        </li>
=======
        <div className="food">
          {randomFood && (
            <div>
              <img
                src={trashIcon}
                alt="trash icon"
                className="food-delete-icon"
                onClick={(e) => handleDeleteFood(e)}
              />
              <img
                src={randomFood.image}
                alt={randomFood.foodName || "Food Name"}
              />
              <h3 className="food-title">{randomFood.foodName}</h3>
              <img
                className="food-eat-icon"
                src={eatIcon}
                alt="red trash icon"
                onClick={(e) => handleEatFood(e)}
              />
            </div>
          )}
        </div>
>>>>>>> 4448e3421dd36582cc940cc09b2f547c0626f388
      </div>
    </>
  );
};

export default EatItOrLeaveIt;
