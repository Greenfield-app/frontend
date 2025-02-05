type CreateAccountProps = {};
import "../styles/modules/createaccount.css";
//  (props) temp removed for build
const CreateAccount: React.FC<CreateAccountProps> = (props) => {
  return (
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
  );
};

export default CreateAccount;
