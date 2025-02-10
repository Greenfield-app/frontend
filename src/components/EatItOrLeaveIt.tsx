import "../styles/modules/eatitorleaveit.css";
import {
  UserInfo,
  FoodInfoDisplay,
  RandomFoodWithRestaurant,
  RestaurantInfo,
} from "../vite-env";
import {
  sendNewRecord,
  fetchRecommendation,
  addNewFood,
  fetchLocationByIP,
} from "../helper/fetchHelper";
import { useState, useEffect } from "react";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";

interface EatItOrLeaveItProps {
  currentUser: UserInfo;
  setView: Function;
}

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = ({
  currentUser,
  setView,
}) => {
  // random food for picking recommendation from foods array
  const [randomFood, setRandomFood] = useState<FoodInfoDisplay | null>(null);
  const [restaurantsInfo, setRestaurantsInfo] = useState<RestaurantInfo[]>([]);
  const getNextFood = async () => {
    const recommendationResponse: RandomFoodWithRestaurant =
      await fetchRecommendation();
    console.log(recommendationResponse);
    setRandomFood(recommendationResponse.randomFoodInfo);
    setRestaurantsInfo(recommendationResponse.restaurants);
  };
  useEffect(() => {
    const resolveRecommendation = async () => {
      getNextFood();
      await fetchLocationByIP();
    };
    resolveRecommendation();
  }, []);

  const handleDeleteFood = () => {
    getNextFood();
    //change to get next food
  };

  const handleEatFood = async () => {
    console.log(randomFood, " was eaten!");
    //send only not guest record to db
    if (currentUser && currentUser.userId !== -1 && currentUser.userId !== 0) {
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

        <div className="food">
          {randomFood && (
            <div>
              <img
                src={trashIcon}
                alt="trash icon"
                className="food-delete-icon"
                onClick={() => handleDeleteFood()}
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
                onClick={() => handleEatFood()}
              />

              {restaurantsInfo !== null && (
                <div id="places">
                  {restaurantsInfo.map((restaurant) => {
                    return (
                      <div key={restaurant.name} className="single-restaurant">
                        <div>{restaurant.name} </div>
                        <div>{restaurant.address} </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EatItOrLeaveIt;
