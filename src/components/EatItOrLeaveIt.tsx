import "../styles/modules/eatitorleaveit.css";
import { FoodInfo } from "../vite-env";
import { useState, useEffect } from "react";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";

type EatItOrLeaveItProps = {
  setView: Function;
  foods: FoodInfo[];
  setFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>;
};
//  (props) temp removed for build

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = (props) => {
  // random food for picking recommendation from foods array
  let [randomFood, setRandomFood] = useState<FoodInfo>(props.foods[0]);

  // temporary food list until database/ apis done
  const sampleFoods: FoodInfo[] = [
    { id: 1, foodName: "ramen", description: null },
    { id: 2, foodName: "yakiniku", description: null },
    { id: 3, foodName: "mexican", description: null },
    { id: 4, foodName: "italian", description: null },
    { id: 5, foodName: "pizza", description: null },
    { id: 6, foodName: "sushi", description: null },
    { id: 7, foodName: "oden", description: null },
  ];

  // eventually want to use this to make random food suggestion
  const getRandomFoodIndex = (arrLength: number) => {
    return Math.floor(Math.random() * arrLength);
  };

  const handleDeleteFood = (foodCard: FoodInfo) => {
    console.log(foodCard, " was deleted!");
    // delete in database
  };

  const handleEatFood = (foodCard: FoodInfo) => {
    console.log(foodCard, " was eaten!");
    // send to database Records of when eaten
  };

  useEffect(() => {
    props.setFoods(sampleFoods);
    setRandomFood(props.foods[getRandomFoodIndex(props.foods.length)]); // currently doesn't work, will need to refactor
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
            // onClick={() => handleEatFood(food)}
          />
          <h3 className="food-title">Ramen</h3>
          <img
            className="food-eat-icon"
            src={eatIcon}
            alt="red trash icon"
            // onClick={() => handleDeleteFood(food)}
          />
        </li>
      </div>
    </>
  );
};

export default EatItOrLeaveIt;
