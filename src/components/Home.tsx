import { UserInfo, Record } from "../vite-env";
import handHistory from "../assets/icons/history-hand.svg";
import handSwipe from "../assets/icons/swipe-hand.svg";
import whatsEat from "../assets/icons/whatsEat-icon.png";
import { fetchEatHistory } from '../api/history.ts'
import ProfilePage from "./ProfilePage";

interface HomeProps {
  setView: Function;
  currentUser: UserInfo;
  view: string;
  setSavedRestaurants: React.Dispatch<React.SetStateAction<Record[]>>
}

const Home: React.FC<HomeProps> = (HomeProps) => {

  const [showProfile, setShowProfile] = useState(false); // State to toggle profile page view

  const checkProfilePage = () => {
    setShowProfile(!showProfile); // check between showing and hiding the profile page
  };

  return (
    <>
      <nav className="l-header header">
        <header className="home-header">
          <img className="whatseat-icon" src={whatsEat} />
          <h1 onClick={() => HomeProps.setView("home")}>WhatsEat</h1>
        </header>
        <div className="username-and-logout">
          <h1 onClick={checkProfilePage} style={{ cursor: "pointer" }}>
          <span>{HomeProps.currentUser.userName}</span>
          </h1>
          <p className="nav-text" onClick={() => HomeProps.setView("loginpage")}>
            Logout
          </p>
        </div>
      </nav>

    {/* Conditional Rendering for ProfilePage */}
    {showProfile && (
        <ProfilePage
          user={props.currentUser} // Passing current user data
          deleteAccount={() => alert("Account deleted")} // Dummy delete function
        />
      )}

      <section className="l-content-container">
        <div
          className="eats-history pop-dim"
          onClick={async () => {
            const eatHistory = await fetchEatHistory(`/records/${HomeProps.currentUser.userId}`)
            console.log(eatHistory)
            HomeProps.setSavedRestaurants(Array.isArray(eatHistory) ? eatHistory : [])
            HomeProps.setView("foodlist")
          }}
        >
          <img className="history-icon" src={handHistory} />
          <h1>Eats History</h1>
        </div>
        <div
          className="help-me-choose pop-dim"
          onClick={() => HomeProps.setView("eatitorleaveit")}
        >
          <img className="swipe-icon" src={handSwipe} />
          <h1>Help me Choose</h1>
        </div>
      </section>
    </>
  );
};

export default Home;
