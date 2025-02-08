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
  const [loginUser, setLoginUser] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const vertifyHandler = async (e: FormEvent<HTMLFormElement>) => {
    // const result = vertifyLogin({userId:3,password:""});
  };
  return (
    <div className="loginpage">
      <nav className="l-header header">
        <h1>What's Eat</h1>
      </nav>
      <form
        onSubmit={(e) => {
          console.log(e);
        }}
      >
        <h1>Login</h1>

        <label htmlFor="">Username: </label>
        <input type="text" id="username" placeholder="UserName" />

        <label htmlFor="">Emial: </label>
        <input type="email" id="email" placeholder="Email" />

        <label htmlFor="">Password: </label>
        <input type="password" id="password" placeholder="Password" />
      </form>
      <h3 className="signup" onClick={() => props.setView("createaccount")}>
        No Account? Sign up today!
      </h3>
      <button>Submit</button>
    </div>
  );
};

export default LoginPage;
