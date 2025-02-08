import "../styles/modules/loginpage.css";
import { UserInfo, LoginError, LoginInfo } from "../vite-env";
import { useState, useEffect, FormEvent, useReducer } from "react";
import { vertifyLogin } from "../helper/fetchHelper";
interface LoginPageProps {
  setCurrentUser: (UserInfo: UserInfo) => void;
  setView: (view: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setView, setCurrentUser }) => {
  const [submitState, setSubmitState] = useState<LoginError>({
    submitted: false,
    loginSuccessful: false,
  });

  const vertifyHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentLoginInfo: LoginInfo = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    try {
      const result: UserInfo = await vertifyLogin(currentLoginInfo);
      console.log(result);
      setCurrentUser(result);
      setSubmitState({
        submitted: true,
        loginSuccessful: true,
      });
      await setTimeout(() => {
        setView("foodlist");
      }, 3000);
    } catch (error) {
      setSubmitState({ submitted: true, loginSuccessful: false });
      console.error(error);
    }
  };
  return (
    <div className="loginpage">
      <nav className="l-header header">
        <h1>What's Eat</h1>
      </nav>
      <form
        onSubmit={(e) => {
          vertifyHandler(e);
        }}
      >
        <h1>Login</h1>
        <label htmlFor="">Emial: </label>
        <input type="email" id="email" placeholder="Email" />

        <label htmlFor="">Password: </label>
        <input type="password" id="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
      <div>
        {submitState.submitted === true &&
          submitState.loginSuccessful === false && (
            <span className="error-submit">Log In Failed</span>
          )}
        {submitState.submitted === true &&
          submitState.loginSuccessful === true && (
            <span className="success-submit">Log In Success</span>
          )}
      </div>
      <h3 className="signup" onClick={() => setView("createaccount")}>
        No Account? Sign up today!
      </h3>
    </div>
  );
};

export default LoginPage;
