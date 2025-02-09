import "../styles/modules/home.css";
import FoodList from "./FoodList";
import EatItOrLeaveIt from "./EatItOrLeaveIt";
import { FoodInfo, UserInfo } from "../vite-env";
interface HomeProps {
  foods: FoodInfo[];
  setFoods: React.Dispatch<React.SetStateAction<FoodInfo[]>>;
  setView: Function;
  currentUser: UserInfo;
  view: string;
}
//  (props) temp removed for build

const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => props.setView("home")}>What's Eat</h1>
        <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
      </nav>

      <h1 onClick={() => props.setView("foodlist")}>My List</h1>
      <h1 onClick={() => props.setView("eatitorleaveit")}>Help me choose</h1>
    </>
  );
};

export default Home;
