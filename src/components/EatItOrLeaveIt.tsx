import "../styles/modules/eatitorleaveit.css";
import { FoodInfo, UserInfo, FoodInfoDisplay } from "../vite-env";
import {
  sendNewRecord,
  fetchRecommendation,
  addNewFood,
} from "../helper/fetchHelper";
import { useState, useEffect, MouseEvent } from "react";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";

interface EatItOrLeaveItProps {
  currentUser: UserInfo;
  setView: Function;
  availableFoodsWithImg: FoodInfoDisplay;
  setAvailableFoodsWithImg: (foodInfoDisplay: FoodInfoDisplay) => void;
}

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = ({
  currentUser,
  setView,
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
        <div className="username-and-logout">
          <h1>{currentUser.userName}</h1>
          <h1 onClick={() => setView("loginpage")}>Logout</h1>
        </div>
      </nav>
      <div className="eatitorleaveit-container">
        <h1>Eat it or leave it</h1>
        {/* <h2>{randomFood.name}</h2> currently doesn't work, will need to refactor*/}

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
      </div>
    </>
  );
};

export default EatItOrLeaveIt;
