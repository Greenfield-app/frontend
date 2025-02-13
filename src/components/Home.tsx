import { useState } from "react";
import { UserInfo } from "../vite-env";
import handHistory from "../assets/icons/history-hand.svg";
import handSwipe from "../assets/icons/swipe-hand.svg";
import whatsEat from "../assets/icons/whatsEat-icon.png";
import ProfilePage from "./ProfilePage";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface HomeProps {
  setView: Function;
  currentUser: UserInfo;
  view: string;
  setSearchLocation: Function
  searchbarShown: boolean,
  currentPosition: string | null
}

const Home: React.FC<HomeProps> = (props) => {

  const [showProfile, setShowProfile] = useState(false); // State to toggle profile page view

  const checkProfilePage = () => {
    setShowProfile(!showProfile); // check between showing and hiding the profile page
  };

  return (
    <>
      <nav className="l-header header">
        <header className="home-header">
          <img className="whatseat-icon" src={whatsEat} />
          <h1 onClick={() => props.setView("home")}>WhatsEat</h1>
        </header>
        {/* Only Display the search bar when the user has denied location access */}
        {props.searchbarShown && props.currentPosition === null ? (
          <Form className="search-bar">
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Enter Location"
                className=" mr-sm-2"
                onKeyDown={
                  (event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      props.setSearchLocation((event.target as HTMLInputElement).value)
                      props.setView('eatitorleaveit')
                    }
                  }
                }
              />
            </Col>
          </Row>
        </Form>
        ) : null}
        <div className="username-and-logout">
          <h1 onClick={checkProfilePage} style={{ cursor: "pointer" }}>
          <span>{props.currentUser.userName}</span>
          </h1>
          <h3 className="nav-text" onClick={() => props.setView("loginpage")}>
            Logout
          </h3>
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
          onClick={() => props.setView("foodlist")}
        >
          <img className="history-icon" src={handHistory} />
          <h1>Eats History</h1>
        </div>
        <div
          className="help-me-choose pop-dim"
          onClick={() => props.setView("eatitorleaveit")}
        >
          <img className="swipe-icon" src={handSwipe} />
          <h1>Help me Choose</h1>
        </div>
      </section>
    </>
  );
};

export default Home;
