import { FoodInfo, UserInfo } from "../vite-env";
import trashIcon from "../assets/icons/icon-monster-trash.svg";
import eatIcon from "../assets/icons/eat.svg";
import { useEffect } from "react";
import FoodCard from "./FoodCard";

// types from App.tsx
interface FoodListProps {
  setAvailableFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>; // to be used for deleting and editing Food Cards
  availableFoods: FoodInfo[]; // to get current Food list
  currentUser: UserInfo;
  setView: Function;
  setSingleUsersFoods: (FoodInfo: FoodInfo[]) => void;
  singleUsersFoods: FoodInfo[];
}

//  (props) temp removed for build
const FoodList: React.FC<FoodListProps> = (props) => {
  // const sampleFoods: FoodInfo[] = [
  //   { id: 1, foodName: "ramen", description: null },
  //   { id: 2, foodName: "yakiniku", description: null },
  //   { id: 3, foodName: "mexican", description: null },
  //   { id: 4, foodName: "italian", description: null },
  //   { id: 5, foodName: "pizza", description: null },
  //   { id: 6, foodName: "sushi", description: null },
  //   { id: 7, foodName: "oden", description: null },
  // ];
  useEffect(() => {
    // console.log(sampleFoods);
    // props.setAvailableFoods(sampleFoods);
    // props.setSingleUsersFoods(sampleFoods);
  }, []);

  return (
    <>
      <nav className='l-header header'>
        <h1 onClick={() => props.setView("home")}>What's Eat</h1>
        <button
          className='btn-addfoodcard'
          onClick={() => props.setView("addnewcard")}
        >
          +
        </button>
        {/* <h1 onClick={() => props.changeView("createaccount")}>
          Create Account
        </h1> */}
        <h1>{props.currentUser.userName}</h1>
        <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
      </nav>
      <ul className='food-list l-food-list'>
        {props.singleUsersFoods.map((food) => (
          <li key={food.foodName} className='food'>
            <FoodCard food={food} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FoodList;
