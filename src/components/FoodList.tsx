import { FoodInfo, UserInfo, Record } from "../vite-env";
import FoodCard from "./RestaurantItem";
import whatsEat from "../assets/icons/whatsEat-icon.png";
import ListGroup from 'react-bootstrap/ListGroup';

// types from App.tsx
interface FoodListProps {
  currentUser: UserInfo;
  setView: Function;
  savedRestaurants: Record[];
  setSavedRestaurants: React.Dispatch<React.SetStateAction<Record[]>>;
}

//  (props) temp removed for build
const FoodList: React.FC<FoodListProps> = (props) => {
  return (
    <>
      <nav className="l-header header">
        <header className="home-header">
          <img className="whatseat-icon" src={whatsEat} />
          <h1 onClick={() => props.setView("home")}>WhatsEat</h1>
        </header>
        <div className="username-and-logout">
          <h1>{props.currentUser.userName}</h1>
          <h3 className="nav-text" onClick={() => props.setView("loginpage")}>
            Logout
          </h3>
        </div>
      </nav>
      <h2 className="eats-history-title">Eats History:</h2>

      {console.log(props.savedRestaurants)}

      <ListGroup className="food-list l-food-list">
        {props.savedRestaurants.map((restaurant, index) => (
          <ListGroup.Item key={index}>
            <FoodCard restaurant={restaurant} savedRestaurants={props.savedRestaurants} index={index} setSavedRestaurants={props.setSavedRestaurants}/>
          </ListGroup.Item>
        ))}  
      </ListGroup>
    </>
  );
};

export default FoodList;
