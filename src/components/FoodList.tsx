import { FoodInfo } from "../vite-env";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";
import { useEffect } from "react";

// types from App.tsx
interface FoodListProps {
  setFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>; // to be used for deleting and editing Food Cards
  foods: FoodInfo[]; // to get current Food list
  currentUser: string;
  setView: Function;
}

//  (props) temp removed for build
const FoodList: React.FC<FoodListProps> = (props) => {
  // temporary food list until database/ apis done
  const sampleFoods: FoodInfo[] = [
    { id: 1, name: "ramen", description: null },
    { id: 2, name: "yakiniku", description: null },
    { id: 3, name: "mexican", description: null },
    { id: 4, name: "italian", description: null },
    { id: 5, name: "pizza", description: null },
    { id: 6, name: "sushi", description: null },
    { id: 7, name: "oden", description: null },
  ];

  // set foods state to the samples

  useEffect(() => {
    props.setFoods(sampleFoods);
  }, []);

  const handleDeleteFood = (foodCard: FoodInfo) => {
    console.log(foodCard, " was deleted!");
    // delete in database
  };

  const handleEatFood = (foodCard: FoodInfo) => {
    console.log(foodCard, " was eaten!");
    // send to database Records of when eaten
  };

  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => props.setView("foodlist")}>What's Eat</h1>
        <button
          className="btn-addfoodcard"
          onClick={() => props.setView("addnewcard")}
        >
          +
        </button>
        {/* <h1 onClick={() => props.changeView("createaccount")}>
          Create Account
        </h1> */}
        <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
      </nav>
      <ul className="food-list l-food-list">
        {props.foods.map((food) => (
          <li key={food.id} className="food">
            <img
              className="food-eat-icon"
              src={eatIcon}
              alt="eat icon"
              onClick={() => handleEatFood(food)}
            />
            <h3 className="food-title">{food.name}</h3>
            <img
              className="food-delete-icon"
              src={trashIcon}
              alt="red trash icon"
              onClick={() => handleDeleteFood(food)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FoodList;
