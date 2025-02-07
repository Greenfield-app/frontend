type HomeProps = {
  setView: Function;
};
import "../styles/modules/home.css";
//  (props) temp removed for build

const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => props.setView("foodlist")}>What's Eat</h1>
        <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
      </nav>
      <h1>This is the home component! more coming soon</h1>
    </>
  );
};

export default Home;
