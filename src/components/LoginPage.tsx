type LoginPageProps = {
  setCurrentUser: Function; //will use this function to change current user if login successful
};
import "../styles/modules/loginpage.css";
//  (props) temp removed for build

const LoginPage: React.FC<LoginPageProps> = (props) => {
  return (
    <div className="loginpage">
      <h1>Login</h1>
      <label htmlFor="">Username: </label>
      <input type="text" />
      <label htmlFor="">Password: </label>
      <input type="text" />
      <button>Submit</button>
    </div>
  );
};

export default LoginPage;
