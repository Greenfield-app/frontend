import { FoodInfo, UserInfo, RecordWithFood } from "../vite-env";
import FoodCard from "./RestaurantItem";
import whatsEat from "../assets/icons/whatsEat-icon.png";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// types from App.tsx
interface FoodListProps {
  recordsWithFood: RecordWithFood[];
  setRecordsWithFood: Function;
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

      <ListGroup className="food-list l-food-list">
        <FoodCard />
      </ListGroup>

      <ul className="food-list l-food-list">
        {/* {props.recordsWithFood.map((data) => (
          <li key={data.food.foodName + Math.random()} className="food">
            <FoodCard
              recordWithFood={data}
              recordsWithFood={props.recordsWithFood}
              setRecordsWithFood={props.setRecordsWithFood}
            />
          </li>
        ))} */}
      </ul>
    </>
  );
};

export default FoodList;
