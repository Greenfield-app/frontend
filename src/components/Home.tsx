import "../styles/modules/home.css";
import FoodList from "./FoodList";
import EatItOrLeaveIt from "./EatItOrLeaveIt";
import { FoodInfo, UserInfo } from "../vite-env";
interface HomeProps {
  availableFoods: FoodInfo[];
  setAvailableFoods: Function;
  setView: Function;
  currentUser: UserInfo;
  view: string;
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => props.setView("home")}>What's Eat</h1>
        <h1>{props.currentUser.userName}</h1>
        <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
      </nav>

      <h1 onClick={() => props.setView("foodlist")}>My List</h1>
      <h1 onClick={() => props.setView("eatitorleaveit")}>Help me choose</h1>
    </>
  );
};

export default Home;
