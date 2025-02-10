import { FoodInfo, UserInfo } from "../vite-env";

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
  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => props.setView("home")}>What's Eat</h1>
        {/* <button
          className="btn-addfoodcard"
          className="btn-addfoodcard"
          onClick={() => props.setView("addnewcard")}
        >
          +
        </button> */}
        {/* <h1 onClick={() => props.changeView("createaccount")}>
          Create Account
        </h1> */}
        <div className="username-and-logout">
          <h1>{props.currentUser.userName}</h1>
          <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
        </div>
      </nav>
      <ul className="food-list l-food-list">
        {props.singleUsersFoods.map((food) => (
          <li key={food.foodName} className="food">
            <FoodCard food={food} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FoodList;
