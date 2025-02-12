import whatsEat from "../assets/icons/whatsEat-icon.png";
import eatIt from "../assets/icons/eat-it.png";
import leaveIT from "../assets/icons/leave-it.png";
import { useState, useEffect } from "react";
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
  fetchNearbyRestaurants,
} from "../helper/fetchHelper";

interface EatItOrLeaveItProps {
  currentUser: UserInfo;
  setView: Function;
}

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = ({
  currentUser,
  setView,
}) => {

  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<RestaurantInfo[]>([]);
  const [randomRestaurant, setRandomRestaurant] = useState<RestaurantInfo | null>(null);
  const [usedIndices, setUsedIndices] = useState<Number[]>([]);


  // random food for picking recommendation from foods array
  const [randomFood, setRandomFood] = useState<FoodInfoDisplay | null>(null);
  const [restaurantsInfo, setRestaurantsInfo] = useState<RestaurantInfo[]>([]);
  
  // Function to randomly grab a restaurant from the nearbyRestaurants array
  const getNextRestaurant = () => {

    let randomIndex:number = Math.floor(Math.random() * (nearbyRestaurants.length));
    while (usedIndices.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * (nearbyRestaurants.length));
    }

    setRandomRestaurant(nearbyRestaurants[randomIndex]);
    setUsedIndices([...usedIndices, randomIndex])
  };

  // Effect to fetch nearby restaurants when current location is updated
  useEffect(() => {
    if (currentLocation) {
      fetchNearbyRestaurants(`restaurants/nearby?location=${currentLocation}`)
        .then(data => {
          setNearbyRestaurants(Array.isArray(data) ? data : []);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    }
  }, [currentLocation])

  useEffect(() => {
    const resolveRecommendation = async () => {
      getNextRestaurant();
      await fetchLocationByIP();
    };
    resolveRecommendation();
  }, []);

  const handleDeleteFood = () => {
    getNextRestaurant();
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
    }
    getNextRestaurant();
  };

  return (
    <>
      <nav className="l-header header">
        <header className="home-header">
          <img className="whatseat-icon" src={whatsEat} />
          <h1 onClick={() => setView("home")}>WhatsEat</h1>
        </header>
        <div className="username-and-logout">
          <h1>{currentUser.userName}</h1>
          <h3 className="nav-text" onClick={() => setView("loginpage")}>
            Logout
          </h3>
        </div>
      </nav>
      <div className="eatitleaveit-content-container">
        <h1 className="eatitorleaveit-title">Eat it or leave it</h1>
        {/* <h2>{randomFood.name}</h2> currently doesn't work, will need to refactor*/}

        <div className="eatitorleaveit-container">
          {randomFood && (
            <div>
              <img
                className="eat-leave-img"
                src={randomFood.image}
                alt={randomFood.foodName || "Food Name"}
              />
              <h3 className="food-title">{randomFood.foodName}</h3>
              <div className="eat-or-leave-btns">
                <img
                  className="eat-it-icon"
                  src={eatIt}
                  alt="eat it icon"
                  onClick={() => handleEatFood()}
                />
                <p>Or</p>
                <img
                  src={leaveIT}
                  alt="leave it icon"
                  className="leave-it-icon"
                  onClick={() => handleDeleteFood()}
                />
              </div>
            </div>
          )}
        </div>
        {restaurantsInfo !== null && (
          <ul className="single-restaurant">
            {restaurantsInfo.map((restaurant) => {
              return (
                <li key={restaurant.name}>
                  <a
                    href={`https://www.google.com/maps/search/?q=${
                      restaurant.name + ", " + restaurant.address
                    }`}
                    target="blank"
                  >
                    {restaurant.name}
                  </a>
                  <p>{`rating: ${restaurant.rating}⭐`}</p>
                </li>
              );
            })}
          </ul>
        )}
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
