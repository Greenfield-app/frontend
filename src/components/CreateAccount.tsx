type CreateAccountProps = {};
import "../styles/modules/createaccount.css";
//  (props) temp removed for build
const CreateAccount: React.FC<CreateAccountProps> = (props) => {
  return (
    <>
      <nav className="l-header header">
        <h1>What's Eat</h1>
      </nav>

      <div className="createaccount">
        <h1>Create Account</h1>
        <label htmlFor="">Username: </label>
        <input type="text" />
        <label htmlFor="">Password: </label>
        <input type="text" />
        <label htmlFor="">Confirm Password: </label>
        <input type="text" />
        <button>Submit</button>
      </div>
    </>
  );
};

export default CreateAccount;
