import "../styles/modules/loginpage.css";
import { UserInfo, LoginError, LoginInfo } from "../vite-env";
import { useState, useEffect, FormEvent } from "react";
import { vertifyLogin } from "../helper/fetchHelper";
interface LoginPageProps {
  setCurrentUser: (UserInfo: UserInfo) => void;
  setView: (view: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [submitError, setSubmitError] = useState<LoginError>({
    email: false,
    password: false,
  });

  const vertifyHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentLoginInfo: LoginInfo = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    try {
      const result = await vertifyLogin(currentLoginInfo);
      console.log(result);
    } catch (error) {
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
      <h3 className="signup" onClick={() => props.setView("createaccount")}>
        No Account? Sign up today!
      </h3>
    </div>
  );
};

export default LoginPage;
