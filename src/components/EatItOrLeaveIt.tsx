type EatItOrLeaveItProps = {
  setView: Function;
};
import "../styles/modules/eatitorleaveit.css";
//  (props) temp removed for build

const EatItOrLeaveIt: React.FC<EatItOrLeaveItProps> = (props) => {
  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => props.setView("home")}>What's Eat</h1>
        <h1 onClick={() => props.setView("loginpage")}>Logout</h1>
      </nav>
      <h1>This is the eat it or leave it component! more coming soon</h1>
    </>
  );
};

export default EatItOrLeaveIt;
