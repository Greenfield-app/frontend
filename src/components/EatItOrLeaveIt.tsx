import whatsEat from "../assets/icons/whatsEat-icon.png";
import eatIt from "../assets/icons/eat-it.png";
import leaveIT from "../assets/icons/leave-it.png";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { UserInfo, FoodInfoDisplay, RestaurantInfo} from "../vite-env";
import { saveRestaurant, fetchRestaurant } from '../api/restaurants'
import { addRestaurantToEatsHistory } from '../api/history'

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
  
  const [randomRestaurant, setRandomRestaurant] = useState<RestaurantInfo>({
    name: "",
    address: "",
    rating: 0,
    totalRatings: 0,
    priceLevel: 0,
    photoURL: "",
    placeID: "",
  });

  const [usedIndices, setUsedIndices] = useState<Number[]>([]);

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

  const handleDeclineRestaurant = () => {
    getNextRestaurant();
    //change to get next food
  };

  const handleDineAtRestaurant = async () => {
    // Save restaurant record to the database if the user is a member
    if (currentUser && currentUser.userId !== -1 && currentUser.userId !== 0) {
      if (randomRestaurant && randomRestaurant.name) {
        try {

          const savedRestaurant = await fetchRestaurant(`/restaurants/${randomRestaurant.placeID}`)

          if (savedRestaurant) {
            await addRestaurantToEatsHistory(`/records/${currentUser.userId}/${savedRestaurant.id}`)
          } else {
            await saveRestaurant('/restaurants/new', {
              name: randomRestaurant.name,
              placeID: randomRestaurant.placeID
            });
            const newRestaurant = await fetchRestaurant(`/restaurants/${randomRestaurant.placeID}`)
            await addRestaurantToEatsHistory(`/records/${currentUser.userId}/${newRestaurant.id}`)
          }
        } catch (error) {
          console.error(error, "Current user do not exist in database");
        }
      }
    }
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
                alt={randomRestaurant.name || "Restaurant Image"}
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
                  onClick={() => handleDineAtRestaurant()}
                />
                <p>Or</p>
                <img
                  src={leaveIT}
                  alt="leave it icon"
                  className="leave-it-icon"
                  onClick={() => handleDeclineRestaurant()}
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
