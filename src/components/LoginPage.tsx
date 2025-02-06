type LoginPageProps = {
  setCurrentUser: Function; //will use this function to change current user if login successful
  changeView: Function;
};
import "../styles/modules/loginpage.css";
//  (props) temp removed for build

const LoginPage: React.FC<LoginPageProps> = (props) => {
  return (
    <>
      <nav className="l-header header">
        <h1>What's Eat</h1>
      </nav>

      <div className="loginpage">
        <h1>Login</h1>
        <label htmlFor="">Username: </label>
        <input type="text" />
        <label htmlFor="">Password: </label>
        <input type="text" />
        <button>Submit</button>
        <h3
          className="signup"
          onClick={() => props.changeView("createaccount")}
        >
          No Account? Sign up today!
        </h3>
      </div>
    </>
  );
};

export default LoginPage;
