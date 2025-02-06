interface AddNewCardProps {
  changeView: Function;
}
import "../styles/modules/addnewcard.css";
//  (props) temp removed for build
const AddNewCard: React.FC<AddNewCardProps> = (props) => {
  return (
    <>
      <nav className="l-header header">
        <h1 onClick={() => props.changeView("foodlist")}>What's Eat</h1>
        <button
          className="btn-addfoodcard"
          onClick={() => props.changeView("addnewcard")}
        >
          +
        </button>
        {/* <h1 onClick={() => props.changeView("createaccount")}>
          Create Account
        </h1> */}
        <h1 onClick={() => props.changeView("loginpage")}>Logout</h1>
      </nav>
      <div className="addnewcardview">
        <div className="newcard">
          <label htmlFor="">Add new food!</label>
          <input type="text" placeholder="name" />
          <input type="text" placeholder="description" />
        </div>
      </div>
    </>
  );
};

export default AddNewCard;
