import FoodList from "./FoodList";
import EatItOrLeaveIt from "./EatItOrLeaveIt";
import { FoodInfo, UserInfo } from "../vite-env";
import handHistory from "../assets/icons/history-hand.svg";
import handSwipe from "../assets/icons/swipe-hand.svg";
import whatsEat from "../assets/icons/whatsEat-icon.png";

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
      <nav className='l-header header'>
        <header className='home-header'>
          <img className='whatseat-icon' src={whatsEat} />
          <h1 onClick={() => props.setView("home")}>WhatsEat</h1>
        </header>
        <div className='username-and-logout'>
          <h1>{props.currentUser.userName}</h1>
          <h3 className='nav-text' onClick={() => props.setView("loginpage")}>
            Logout
          </h3>
        </div>
      </nav>
      <section className='l-content-container'>
        <div
          className='eats-history pop-dim'
          onClick={() => props.setView("foodlist")}
        >
          <img className='history-icon' src={handHistory} />
          <h1>Eats History</h1>
        </div>
        <div
          className='help-me-choose pop-dim'
          onClick={() => props.setView("eatitorleaveit")}
        >
          <img className='swipe-icon' src={handSwipe} />
          <h1>Help me Choose</h1>
        </div>
      </section>
    </>
  );
};

export default Home;
