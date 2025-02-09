import { FoodInfo } from "../vite-env";
import { useEffect } from "react";
import FoodCard from "./FoodCard.tsx";

// types from App.tsx
interface FoodListProps {
  setAvailableFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>; // to be used for deleting and editing Food Cards
  availableFoods: FoodInfo[]; // to get current Food list
  currentUser: string;
  setView: Function;
}

//  (props) temp removed for build
const FoodList: React.FC<FoodListProps> = (props) => {
  // temporary food list until database/ apis done
  // const sampleFoods: FoodInfo[] = [
  //   { id: 1, name: "ramen", description: null },
  //   { id: 2, name: "yakiniku", description: null },
  //   { id: 3, name: "mexican", description: null },
  //   { id: 4, name: "italian", description: null },
  //   { id: 5, name: "pizza", description: null },
  //   { id: 6, name: "sushi", description: null },
  //   { id: 7, name: "oden", description: null },
  // ];

  // set foods state to the samples

  useEffect(() => {
    // props.setAvailableFoods(sampleFoods);
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
        <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
      </nav>
      <ul className='food-list l-food-list'>
        {props.availableFoods.map((food) => (
          <li key={food.foodName}>
            <FoodCard food={food} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FoodList;
