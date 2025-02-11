import whatsEat from "../assets/icons/whatsEat-icon.png";
import eatIt from "../assets/icons/eat-it.png";
import leaveIT from "../assets/icons/leave-it.png";
import { useState, useEffect, MouseEvent } from "react";
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
    //send only not guest record to db
    if (currentUser && currentUser.userId !== -1 && currentUser.userId !== 0) {
      //send only not guest record to db
      if (
        currentUser &&
        currentUser.userId !== -1 &&
        currentUser.userId !== 0
      ) {
        if (randomFood && randomFood.foodName) {
          try {
            const foodInfoResponse = await addNewFood(randomFood.foodName);
            if (foodInfoResponse) {
              console.log(foodInfoResponse);
              const response = await sendNewRecord(
                currentUser.userId,
                foodInfoResponse.foodId
              );
              //check if response is ok
              console.log(response);
            }
          } catch (error) {
            console.error(error, "Current user do not exist in database");
          }
        }
      }
      //if guest or user not exist, just get another random food
      getNextFood();
    }
  };

  const address =
    "Ramen Issei, 3 Chome-40-23 Maeharacho, Koganei, Tokyo 184-0013";
  return (
    <>
      <nav className='l-header header'>
        <header className='home-header'>
          <img className='whatseat-icon' src={whatsEat} />
          <h1 onClick={() => setView("home")}>WhatsEat</h1>
        </header>
        <div className='username-and-logout'>
          <h1>{currentUser.userName}</h1>
          <h3 className='nav-text' onClick={() => setView("loginpage")}>
            Logout
          </h3>
        </div>
      </nav>
      <div className='eatitleaveit-content-container'>
        <h1 className='eatitorleaveit-title'>Eat it or leave it</h1>
        {/* <h2>{randomFood.name}</h2> currently doesn't work, will need to refactor*/}

        <div className='eatitorleaveit-container'>
          {randomFood && (
            <div>
              <img
                className='eat-leave-img'
                src={randomFood.image}
                alt={randomFood.foodName || "Food Name"}
              />
              <h3 className='food-title'>{randomFood.foodName}</h3>
              <div className='eat-or-leave-btns'>
                <img
                  className='eat-it-icon'
                  src={eatIt}
                  alt='eat it icon'
                  onClick={(e) => handleEatFood(e)}
                />
                <p>Or</p>
                <img
                  src={leaveIT}
                  alt='leave it icon'
                  className='leave-it-icon'
                  onClick={(e) => handleDeleteFood(e)}
                />
              </div>
              {restaurantsInfo !== null && (
                <ul className='single-restaurant'>
                  {restaurantsInfo.map((restaurant) => {
                    return (
                      <li key={restaurant.name}>
                        <a
                          href={`https://www.google.com/maps/search/?q=${
                            restaurant.name + ", " + restaurant.address
                          }`}
                          target='blank'
                        >
                          {restaurant.name}
                        </a>
                        <p>{`rating: ${restaurant.rating}⭐`}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
        {/* <ul className='single-restaurant'>
          <li>
            <a>Ramen Issei</a>
          </li>
          <li>
            <div> ichigo2</div>
            <div> sample address 2</div>
          </li>
          <li>
            <div> ichigo3</div>
            <div> sample address 3</div>
          </li>
          <li>
            <div> ichigo3</div>
            <div> sample address 3</div>
          </li>
          <li>
            <div> ichigo3</div>
            <div> sample address 3</div>
          </li>
          <li>
            <div> ichigo3</div>
            <div> sample address 3</div>
          </li>
        </ul> */}
      </div>
    </>
  );
};

export default EatItOrLeaveIt;
