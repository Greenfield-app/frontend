import "../styles/modules/eatitorleaveit.css";
import { FoodInfo, UserInfo } from "../vite-env";
import { sendNewRecord } from "../helper/fetchHelper";
import { useState, useEffect, MouseEvent } from "react";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";

interface EatItOrLeaveItProps {
  currentUser: UserInfo;
  setView: Function;
  availableFoods: FoodInfo[];
  singleUsersFoods: FoodInfo[];
  setAvailableFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>;
}

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = ({
  currentUser,
  setView,
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
  }, []);

  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => setView("home")}>What's Eat</h1>
        <h1 onClick={() => setView("loginpage")}>Logout</h1>
      </nav>
      <div className="eatitorleaveit-container">
        <h1>Eat it or leave it</h1>
        {/* <h2>{randomFood.name}</h2> currently doesn't work, will need to refactor*/}

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
      </div>
    </>
  );
};

export default EatItOrLeaveIt;
