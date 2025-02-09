import "../styles/modules/eatitorleaveit.css";
import { FoodInfo } from "../vite-env";
import { useState, useEffect, MouseEvent } from "react";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";

interface EatItOrLeaveItProps {
  setView: Function;
  foods: FoodInfo[];
  setFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>;
}
//  (props) temp removed for build

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = (props) => {
  const sampleFoods: FoodInfo[] = [
    { id: 1, foodName: "ramen", description: null },
    { id: 2, foodName: "yakiniku", description: null },
    { id: 3, foodName: "mexican", description: null },
    { id: 4, foodName: "italian", description: null },
    { id: 5, foodName: "pizza", description: null },
    { id: 6, foodName: "sushi", description: null },
    { id: 7, foodName: "oden", description: null },
  ];
  // random food for picking recommendation from foods array
  const [randomFood, setRandomFood] = useState<FoodInfo>(sampleFoods[0]);

  // temporary food list until database/ apis done

  // eventually want to use this to make random food suggestion

  const handleDeleteFood = (e: MouseEvent<HTMLImageElement>) => {
    console.log(e, " was deleted!");
    //change to get next food
    // delete in database
  };

  const handleEatFood = (e: MouseEvent<HTMLImageElement>) => {
    console.log(e, " was eaten!");
    // send to database Records of when eaten
  };

  useEffect(() => {
    props.setFoods(sampleFoods);
  }, []);

  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => props.setView("home")}>What's Eat</h1>
        <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
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
