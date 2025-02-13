import whatsEat from "../assets/icons/whatsEat-icon.png";
import eatIt from "../assets/icons/eat-it.png";
import leaveIT from "../assets/icons/leave-it.png";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import {
  UserInfo,
  FoodInfoDisplay,
  RandomFoodWithRestaurant,
  RestaurantInfo,
} from "../vite-env";

import {
  sendNewRecord,
  addNewFood,
} from "../helper/fetchHelper";

interface starIconColor {
  orange: string;
  grey: string;
}

interface EatItOrLeaveItProps {
  currentUser: UserInfo;
  setView: Function;
  nearbyRestaurants: RestaurantInfo[];
}

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = ({
  currentUser,
  setView,
  nearbyRestaurants,
}) => {
  
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<RestaurantInfo[]>(
    []
  );
  const [randomRestaurant, setRandomRestaurant] = useState<RestaurantInfo>({
    name: "",
    address: "",
    rating: 0,
    totalRatings: 0,
    priceLevel: 0,
    photoURL: "",
  });

  const [usedIndices, setUsedIndices] = useState<Number[]>([]);

  // random food for picking recommendation from foods array
  const [randomFood, setRandomFood] = useState<FoodInfoDisplay | null>(null);
  const [restaurantsInfo, setRestaurantsInfo] = useState<RestaurantInfo[]>([]);

  // Array needed to loop through for correct stars amount.
  const stars: number[] = [0, 0, 0, 0, 0];

  // Colors to use for stars Icon
  const starColor: starIconColor = {
    orange: "#F2C265",
    grey: "a9a9a9",
  };

  // Function to randomly grab a restaurant from the nearbyRestaurants array
  const getNextRestaurant = () => {
    let randomIndex: number = Math.floor(
      Math.random() * nearbyRestaurants.length
    );
    while (usedIndices.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * nearbyRestaurants.length);
    }

    setRandomRestaurant(nearbyRestaurants[randomIndex]);
    setUsedIndices([...usedIndices, randomIndex]);
  };
  
  // Effect to fetch nearby restaurants when current location is updated
  useEffect(() => {
    if (currentLocation) {
      fetchNearbyRestaurants(`restaurants/nearby?location=${currentLocation}`)
        .then((data) => {
          setNearbyRestaurants(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [currentLocation]);

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
        <h1 className="eatitorleaveit-title">Dine or Decline</h1>

        <div className="eatitorleaveit-container">
          {randomRestaurant !== null &&
          randomRestaurant !== undefined &&
          Object.keys(randomRestaurant).length > 0 ? (
            <div>
              <img
                className="eat-leave-img"
                src={randomRestaurant.photoURL}
                alt={randomRestaurant.name || "Resteraunt Image"}
              />

              <a
                href={`https://www.google.com/maps/search/?q=${
                  randomRestaurant.name + ", " + randomRestaurant.address
                }`}
                target="blank"
                className="food-title"
              >
                {randomRestaurant.name}
              </a>
              <p className="restaurant-address">{randomRestaurant.address}</p>

              <div id="ratingStars">
                <p className="ratingAvg">5</p>
                {stars.map((_, index) => (
                  <FaStar
                    key={index}
                    size={24}
                    color={
                      3 != undefined && 3 > index
                        ? starColor.orange
                        : starColor.grey
                    }
                  />
                ))}
                <p className="rating-total">{`(${randomRestaurant.totalRatings})`}</p>
                <p className="price-range">{randomRestaurant.priceLevel}</p>
              </div>
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
          ) : (
            <h3>No Restaurants found nearby</h3>
          )}

        </div>
      </div>
    </>
  );
};

export default EatItOrLeaveIt;
